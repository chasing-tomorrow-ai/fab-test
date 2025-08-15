import datetime as dt
import typer
from jinja2 import Template
from pathlib import Path

app = typer.Typer()
@app.command()
def make(site: str, url: str, scenario: int, result: str = "PASS"):
    tpl = Template(Path("tools/templates/testlog.md.j2").read_text())
    out = tpl.render(
        date=dt.datetime.now().isoformat(timespec="seconds"),
        site=site, url=url, scenario=scenario, result=result.upper()
    )
    dest = Path(f"bundle/testlog_{scenario}_{site}.md")
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(out)
    typer.echo(f"Wrote {dest}")

if __name__ == "__main__":
    app()
