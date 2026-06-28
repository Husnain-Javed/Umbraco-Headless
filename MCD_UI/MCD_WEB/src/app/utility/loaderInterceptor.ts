import { HttpInterceptorFn } from "@angular/common/http";
import { LoaderService } from "./LoaderService";
import { inject } from "@angular/core";
import { finalize } from "rxjs";

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {

  const loader = inject(LoaderService);


  if (req.url.includes('/assets/')) {
    return next(req);
  }


  loader.show();


  return next(req).pipe(
    finalize(() => loader.hide())
  );
};