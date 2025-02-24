import testEvent from "./fixtures.test.json";
import { IEventComponent } from "../src/components/event.component";
import { printVEvent } from "../src/index";

const result = printVEvent(testEvent as IEventComponent, {});

console.log(result);

