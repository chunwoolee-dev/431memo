import "styled-components";
import { Theme } from './styles/theme';

declare module "styled-components" {
  export interface DefaultTheme {
    color: string
    backgroundColor: string
    paper: string

    media : {
      mobile: string
      stab: string
      btab: string
      laptop: string
    }
    colors : {
      primary: Array<string>
      secondary: Array<string>
      tertiary: Array<string>
      danger: Array<string>
      safe: Array<string>
    }
    space : {
      s: string
      m: string
      b: string
    }
    border : Array<string>

  }
}