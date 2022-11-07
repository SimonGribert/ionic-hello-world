const fetchJson = async (input: RequestInfo | URL, init?: RequestInit) => {
  const response = await fetch(input, init);

  const contentType = response.headers.get("content-type");

  let data;
  if (contentType && contentType.indexOf("application/json") !== -1) {
    data = (await response?.json?.()) ?? {};
  } else {
    data = (await response?.text?.()) ?? "";
  }

  if (response.ok) {
    return data;
  }

  throw new FetchError({
    message: data?.Message,
    status: data?.StatusCode,
  });
};

export class FetchError extends Error {
  status: number;

  constructor({ message, status }: { message: string; status: number }) {
    super(message);

    // if (Error.captureStackTrace) {
    //   Error.captureStackTrace(this, FetchError);
    // }

    this.name = "FetchError";
    this.status = status;
  }
}

export default fetchJson;
