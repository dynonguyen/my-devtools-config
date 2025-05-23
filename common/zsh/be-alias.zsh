function help() {
  echo """
    develop
    stage
    production
    qa
  """
}

function swe() {
  case $1 in
  develop)
    gcloud config set project gam-project-cgd-x0l-zm4
    gcloud container clusters get-credentials bu1-k8s-dev --zone=asia-southeast1-a
    ;;
  stage)
    gcloud config set project veep-staging
    gcloud container clusters get-credentials default --zone=asia-southeast1-a
    ;;
  production)
    gcloud config set project veep-production
    gcloud container clusters get-credentials default --zone=asia-southeast1-a
    ;;
  saas)
    gcloud config set project veep-production
    gcloud container clusters get-credentials saas-1 --region=asia-southeast1
    ;;
  qa)
    gcloud config set project veep-staging
    gcloud container clusters get-credentials qa --zone=asia-southeast1-a
    ;;
  cake-dev)
    gcloud config set project bef-cake-sandbox
    gcloud container clusters get-credentials cake-dev-2 --zone=asia-southeast1
    ;;
  cake-qa)
    gcloud config set project bef-cake-sandbox
    gcloud container clusters get-credentials cake-qa-1 --zone=asia-southeast1
    ;;
  cake-stage)
    gcloud config set project bef-cake-sandbox
    gcloud container clusters get-credentials cake-stage-1 --zone=asia-southeast1
    ;;
  cake-prod)
    gcloud config set project bef-cake-prod
    gcloud container clusters get-credentials cake-prod-1 --zone=asia-southeast1
    ;;
  help | *)
    help
    ;;
  esac
}
