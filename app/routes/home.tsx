import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Form, useFetcher, useLoaderData, type LoaderFunctionArgs } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  return {value: String(formData.get("buttonValue"))};
};

export default function Home() {
  const fetcher = useFetcher<typeof action>();
  return (
    <fetcher.Form method="post">
      <p>submitted value is {fetcher.data?.value}</p>
      <button type="submit" name="buttonValue" value="A">
        Submit A
      </button>
      <button type="submit" name="buttonValue" value="B">
        Submit B
      </button>
    </fetcher.Form>
  );
}
