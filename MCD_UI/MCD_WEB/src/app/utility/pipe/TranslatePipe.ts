import { Pipe, PipeTransform } from "@angular/core";
import { TranslationService } from "../TranslationService";

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {

  constructor(private translation: TranslationService){}

  transform(key:string) {
    return this.translation.get(key);
  }
}