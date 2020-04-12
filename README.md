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
- **Gatsby.js frontend** (named *gatsby*): Based on petitloan/mysite:gatsby
- **Ghost CMS** (named *ghost*): Based on ghost:alpine
- **MariaDB** (named *db*): Based on mariadb

