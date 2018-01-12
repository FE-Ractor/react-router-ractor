import { Store } from "ractor"
import { History, Location } from "history"
import { Go, GoBack, GoForward, Push, Replace } from "./messages"

export function createHistoryStore(history: History): new () => Store<HistoryStoreState> {
  return class HistoryStore extends Store<HistoryStoreState> {
    public state = { location: history.location, history }
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

export type HistoryStoreState = {
  location: Location
  history: History
}