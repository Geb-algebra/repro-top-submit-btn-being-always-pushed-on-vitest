import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRoutesStub, type LoaderFunctionArgs } from "react-router";
import { beforeEach, test } from "vitest";
import Component, { action } from "./home";

const Stub = createRoutesStub([
  {
    path: "/home",
    Component,
    action: action as unknown as (args: LoaderFunctionArgs) => Promise<ReturnType<typeof action>>,
  }
])

beforeEach(() => {
  cleanup();
})

test("submit A succeeds", async () => {
  render(<Stub initialEntries={["/home"]} />);
  await screen.findByText("submitted value is");
  const submitA = await screen.findByRole("button", { name: "Submit A" });
  screen.debug(submitA);
  const user = userEvent.setup();
  await user.click(submitA);
  await screen.findByText("submitted value is A");
})

test("A is submitted even when submit B button is clicked", async () => {
  render(<Stub initialEntries={["/home"]} />);
  await screen.findByText("submitted value is");
  const submitB = await screen.findByRole("button", { name: "Submit B" });
  screen.debug(submitB); // this will show that submit B button is correctly found
  const user = userEvent.setup();
  await user.click(submitB);
  await screen.findByText("submitted value is A"); // not B!
})

// if you change place submit B button on top, these results will be reversed
