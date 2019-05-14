
// paikkis 10-v kysely
import toastr from 'toastr';

toastr.options.timeOut = 0;
toastr.options.extendedTimeOut = 0;
toastr.options.positionClass = 'toast-top-full-width';
//toastr.options.positionClass = 'toast-top-center';
toastr.options.closeButton = true;

window.toastr = toastr;

// index.js:ssä lasketaan montako kertaa näytetty