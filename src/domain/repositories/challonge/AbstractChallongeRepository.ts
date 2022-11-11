import fetch, { RequestInit, Response } from "node-fetch";
import { CHALLONGE_API_KEY } from "../../../utils/Constants";
import { AppError } from "../../exception/AppError";
import { isChallongeValidationError } from "./ChallongeValidationError";
import { parameters } from "./Types";

export class AbstractChallongeRepository {
  protected async fetch<T>(
      route: string,
      parameters?: parameters,
      requestInit?: RequestInit
  ): Promise<T> {
    const url = `https://api.challonge.com/v1/${route}.json?api_key=${CHALLONGE_API_KEY}${this.#toUrl(
        parameters
    )}`;
    console.log(`request url: ${url}`);

    const res = await fetch(url, requestInit);

    switch (res.status) {
      case 200:
        return (await res.json()) as T;
      case 401:
        throw new AppError({
          name: "challonge",
          message: "Unauthorized (Invalid API key or insufficient permissions)",
        });
      case 404:
        throw new AppError({
          name: "challonge",
          message: "Object not found within your account scope",
        });
      case 406:
        throw new AppError({
          name: "challonge",
          message:
            "Requested format is not supported - request JSON or XML only",
        });
      case 422:
        throw await this.#validationError(res);
      case 500:
        throw new AppError({
          name: "challonge",
          message:
            "Something went wrong on our end. If you continually receive this, please contact us.",
        });
    }
    throw new AppError({
      name: "challonge",
      message: "unhandled error",
    });
  }

  async #validationError(res: Response): Promise<AppError> {
    const error = await res.json();
    if (!isChallongeValidationError(error)) {
      return new AppError({
        name: "challonge",
        message: "422 のバリデーションエラーの型が違います。",
      });
    }
    return new AppError({
      name: "challonge",
      message: error.errors.toString(),
    });
  }

  #toUrl(parameters?: parameters): string {
    if (parameters === undefined) return "";
    return Object.keys(parameters).reduce<string>(
        (previousValue, currentKey) => {
          return previousValue + "&" + currentKey + "=" + parameters[currentKey];
        },
        ""
    );
  }
}
