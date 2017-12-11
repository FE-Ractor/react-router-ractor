import { Store } from "ractor"
import { History } from "history"
import { Go, GoBack, GoForward, Push, Replace } from "./messages"

export function createHistoryStore(history: History): Store<{}> {
  return new class HistoryStore extends Store<{}> {
    public createReceive() {
      return this.receiveBuilder()
        .match(Go, go => history.go(go.n))
        .match(GoBack, () => history.goBack())
        .match(GoForward, () => history.goForward())
        .match(Push, push => history.push(push.path, push.state))
        .match(Replace, replace => history.replace(replace.path, replace.state))
        .build()
    }
  }
}