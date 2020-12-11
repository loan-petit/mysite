# Loan PETIT

This website is available online at <https://www.loanpetit.com/>, check it out.

## Contact me

The preferred way of contacting me is to send me an email at <petit.loan1@gmail.com>.

Here are some other places where you can find me at:

**LinkedIn**: <https://www.linkedin.com/in/loanpetit/>

**Malt**: <https://www.malt.fr/profile/loanpetit/>

## Application deployment

Thanks to GitHub Actions, the deployment process is fully automatized.
It triggers when something is pushed onto master.

The application is deployed to a Docker Swarm using Docker images saved in [petitloan/mysite](https://hub.docker.com/r/petitloan/mysite/) Docker Hub public repository.

When the deployment is finished, the following services should be running on the hosting server.
- **Traefik cloud native router** (named *traefik*): Based on traefik:v2.2
- **Next.js application** (named *next_app*): Based on petitloan/mysite:next_app
- **API to send email via AWS SES** (named *send_email*): Based on petitloan/mysite:send_email
- **Redis DB used to queue emails** (named *redis*): Based on redis:6.0-alpine
- **Ghost headless CMS** (named *ghost*): Based on ghost:alpine
- **MariaDB database for Ghost** (named *mariadb*): Based on mariadb