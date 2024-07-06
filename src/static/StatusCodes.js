// HTTP response status codes
// reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
//-----1xx Information responses status codes
export const CONTINUE = 100;
export const SWITCHING_PROTOCOL = 101;

//-----2xx Successful responses status codes
export const OK = 200;
export const CREATED = 201;
export const ACCEPTED = 202;
export const NON_AUTHORITATIVE_INFORMATION = 203;
export const NO_CONTENT = 204;
export const RESET_CONTENT = 205;
export const PARITAL_CONTENT = 206;

//-----3xx Redirection messages status codes
export const MULTIPLE_CHOICE = 300;
export const MOVED_PERMANENTLY = 301;
export const FOUND = 302;
export const SEE_OTHER = 303;
export const NOT_MODIFIED = 304;
export const USE_PROXY = 305;
export const UNUSED = 306;
export const TEMPORARY_REDIRECT = 307;
export const PERMANENT_REDIRECT = 308;

//-----4xx Client error responses status codes
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const PAYMENT_REQUIRED = 402;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const METHOD_NOT_ALLOWED = 405;
export const NOT_ACCEPTABLE = 406;
export const PROXY_AUTHENTICATION_REQUIRED = 407;
export const REQUEST_TIMEOUT = 408;
export const CONFLICT = 409;

//-----5xx Server error responses status codes
export const INTERNAL_SERVER_ERROR = 500;
export const NOT_IMPLEMENTED = 501;
export const BAD_GATEWAY = 502;
export const SERVICE_UNAVAILABLE = 503;
export const GATEWAY_TIMEOUT = 504;
