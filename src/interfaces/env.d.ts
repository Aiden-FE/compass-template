import type { GLOBAL_DOMAIN } from "@/config";
import { GlobalContext } from "./global.interface";

declare global {
  export interface Window {
    [GLOBAL_DOMAIN]?: GlobalContext
  }
}
