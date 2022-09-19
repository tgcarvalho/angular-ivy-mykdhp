import { BehaviorSubject, Observable } from 'rxjs';
import { EventEmitter } from '../eventemitter';

export interface Config {
  domain: string;
  host: string;
  state: string;
}

export interface Payload extends Config {
  data?: any;
}

export class Context {
  private eventContext = new EventEmitter();
  private config: Config;
  private data: BehaviorSubject<any> = new BehaviorSubject({});
  constructor(config: Config) {
    this.config = config;
    this.onInit();
  }

  private onInit(): void {
    if (this.config) {
      const { domain, host, state } = this.config;
      this.eventContext.on(
        [`${domain}:${host}@${state}:init`, `${domain}:${host}@${state}`],
        ({ detail }: CustomEvent<Payload>) => {
          if (detail.data) {
            this.data.next(detail.data);
          }
        }
      );

      //get instance in store
      this.eventContext.emit(`${domain}:init`, {
        ...this.config,
      });
    }
  }

  public get value(): any {
    return this.data.value;
  }

  public set(data: any): void {
    const payload: Payload = {
      ...this.config,
      data,
    };

    const listenners = [
      `${this.config.domain}:${this.config.host}@${this.config.state}`,
      `${this.config.domain}`,
    ];
    this.eventContext.emit(listenners, payload);
  }

  public get(): Observable<any> {
    return this.data.asObservable();
  }
}
