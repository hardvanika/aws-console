# You are the request

Personal site of **Ivan Dmitriev**, AWS Student Builder Group Leader at UC3M (Colmenarejo) and VP of I2C.
Built for the **AWS Student Builder Challenge: Build Your Tech Superpower**.

**Live:** https://main.d16y1b3t2v0np9.amplifyapp.com (hosted on AWS Amplify Hosting)

![The site](docs/screenshot.png)

## The idea

You don't scroll through a portfolio here. **You are an HTTP request** travelling through my AWS architecture.
Every service on the diagram holds one part of my story, and opening it shows a console-style window:

| # | Service | What's inside |
|---|---------|---------------|
| 1 | Amazon Route 53 | Who I am: Moscow → Bulgaria → Greece → Spain |
| 2 | Amazon CloudFront | UC3M, where I study BBA + Computer Science |
| 3 | Amazon API Gateway | AWS Student Builder Group UC3M, which I founded |
| 4 | Amazon EventBridge | I2C, the CS association I'm VP of |
| 5 | Amazon SQS | Student representation (RITSI, UC3M Delegation) |
| 6 | AWS Lambda | **Tech superpowers** (skills as Lambda layers) and things I built |
| 7 | Amazon DynamoDB | Latest certifications |
| 8 | Amazon GuardDuty | Security training on TryHackMe |
| 9 | Amazon CloudWatch | Operations internship at MAPFRE |
| 10 | Amazon SES | Get in touch |

Personal things live at the global edge, communities in the public subnet, technical work in the private subnet.

### Creative feature: a working CloudShell

The bottom panel is a terminal. Try:

```
curl https://ivan.dmitriev   # send the request through every service
ls                           # list the services
cat route53                  # read a service as text
open i2c                     # fly to a service
whoami · contact · help · clear
```

It has tabs (the `+` menu opens new ones, also in other Regions), full screen, a resizable height and command history (↑ ↓).

## How it's built

```
GitHub (main) ──push──► AWS Amplify Hosting ──► static site (site/)
```

The whole site runs on **AWS Amplify Hosting**, the only AWS service it uses: every push to `main`
triggers a new Amplify build and deploy. The architecture diagram is the story, not infrastructure:
each AWS service is a metaphor for one part of my path.

| Path | What it is |
|------|------------|
| `site/` | The static site (HTML + vanilla JS with Preact/htm vendored, no build step) |
| `amplify.yml` | Amplify Hosting build settings (serves `site/`) |

## Deploy it yourself

In the Amplify console: *Create new app → GitHub →* this repo, branch `main`. Amplify picks up `amplify.yml`
and serves `site/`. Every push redeploys.

## Run locally

```bash
cd site && python3 -m http.server 8000
# open http://localhost:8000
```

---

Personal site, not affiliated with Amazon Web Services. AWS service icons from the official AWS Architecture Icons.
