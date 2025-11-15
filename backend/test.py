"""Quick structured-output sanity check using responses.parse."""

from __future__ import annotations

import os
from pathlib import Path

from openai import OpenAI
from pydantic import BaseModel


class DemoPayload(BaseModel):
    name: str
    score: int


def load_env_key() -> None:
    if "OPENAI_API_KEY" in os.environ:
        return
    for candidate in (Path(__file__).with_name(".env.local"), Path(__file__).with_name(".env")):
        if not candidate.exists():
            continue
        for line in candidate.read_text().splitlines():
            if line.startswith("OPENAI_API_KEY="):
                os.environ["OPENAI_API_KEY"] = line.split("=", 1)[1]
                return


def main() -> None:
    load_env_key()
    client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

    response = client.responses.parse(
        model="gpt-4o-2024-08-06",
        input=[
            {"role": "system", "content": "You are a JSON generator."},
            {"role": "user", "content": "Return JSON with name=Demo and score=42."},
        ],
        text_format=DemoPayload,
    )

    print(response.output_parsed)


if __name__ == "__main__":
    main()
