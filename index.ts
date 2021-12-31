import * as information from "./information";
import * as statistics from "./statistics";
import * as submission from "./submission";

Object.assign(window, { ...information, ...statistics, ...submission });
