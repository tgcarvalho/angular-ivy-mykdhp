import { BehaviorSubject, Observable } from 'rxjs';
import { Payload } from '../context';
import { EventEmitter } from '../eventemitter';

export class MFEContext {
  private namespace: string;
  private eventContext = new EventEmitter();
  private data: BehaviorSubject<any> = new BehaviorSubject({});
  constructor({ namespace }: { namespace: string }) {
    this.namespace = namespace;
  }

  public start(): void {
    if (this.namespace) {
      this.eventContext.on(
        `${this.namespace}`,
        ({ detail: payload }: CustomEvent<Payload>) => {
          if (this.namespace === payload.domain) {
            this.mutation(payload);
            console.log(`Store ->`, this.data.value);
          }
        }
      );

      this.afterInit();
    }
  }

  private afterInit(): void {
    this.eventContext.on(
      `${this.namespace}:init`,
      ({ detail: payload }: CustomEvent<Payload>) => {
        const { domain, host, state } = payload;
        const eventInit = `${domain}:${host}@${state}:init`;
        let resp: Payload = {
          ...payload,
        };

        if (host in this.data.value) {
          const _host = this.data.value[host];
          resp = {
            ...payload,
            data: state in _host ? _host[state] : null,
          };

          this.eventContext.emit(eventInit, resp);
        }
      }
    );
  }

  private mutation(payload: Payload): void {
    const update = this.data.value;
    update[payload.host] = {
      ...update[payload.host],
      [payload.state]: payload.data,
    };
    this.data.next(update);
  }
}
