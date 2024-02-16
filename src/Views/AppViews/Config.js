const baseURL = `https://api.synectiks.net/cmdb`;
// export const baseURL = `http://34.199.12.114:6057/api`;

const config = {
  baseURL,
  /* DASHBOARD SERVICES */
  PRODUCT_WISE_COST: `${baseURL}/query/organization/#org-id#/analytics/cost-analytics/product-wise-cost/associated`,
  PRODUCTION_VS_OTHERS: `${baseURL}/query/organization/#org-id#/analytics/cost-analytics/production-vs-others/associated`,
  SERVICE_TYPE_WISE_COST: `${baseURL}/query/organization/#org-id#/analytics/cost-analytics/service-type-wise-cost/associated`,
  GET_CURRENT_HOUR_SPEND_RATE: `/query/organization/#org-id#/analytics/spend-analytics/spend-current-rate/avg-per-hour`,
  GET_CURRENT_DAY_SPEND_RATE: `/query/organization/#org-id#/analytics/spend-analytics/spend-current-rate/per-day`,
  GET_TODAY_SPEND_ANALYTICS: `/query/organization/#org-id#/analytics/spend-analytics/spend-today`,
  GET_YESTERDAY_SPEND_ANALYTICS: `/query/organization/#org-id#/analytics/spend-analytics/spend-yesterday`,
  GET_TOTAL_SPEND: `/query/organization/#org-id#/analytics/spend-analytics/spend-total`,
  GET_TOTAL_CLOUD_WISE_SPEND: `/query/organization/#org-id#/analytics/spend-analytics/cloud-wise-spend`,
  GET_MONTHLY_CLOUD_WISE_SPEND: `/query/organization/#org-id#/analytics/spend-analytics/monthly-cloud-wise-spend`,
  GET_TOTAL_BUDGET: `/query/organization/#org-id#/analytics/spend-analytics/total-budget`,
  GET_MONTHLY_STATISTICS: `/query/organization/#org-id#/analytics/spend-analytics/monthly-statistics`,
  SLA_METRICS: `${baseURL}/query/organization/#org-id#/analytics/sla-analytics/product-wise-sla/associated`,
  PROCESS_CENTRAL: `${baseURL}/query/organization/#org-id#/analytics/process-central-analytics`,
  /* ENVIRONMENT SERVICES  */
  GET_ALL_ENVIRONMENT_COUNT: `/query/organization/#org-id#/environment/count`,
  GET_ALL_ENVIRONMENT_SUMMARY: `/query/organization/#org-id#/environment/summary-list`,
  GET_ALL_ORG_WISE_DEPARTMENTS: `/organization/#org-id#`,
  GET_DEPARTMENT_WISE_DATA: `/department-wise-analytics/get-data`,
  GET_INFRA_TOPOLOGY_DATA: `${baseURL}/query/organization/#org-id#/infra-topology/landing-zone-id/#landing-zone-id#`,
  DEPARTMENTS: `${baseURL}/department`,
  ADD_CLOUD_ENV: `/cloud-environments`,
  GET_SINGLE_ENVIRONMENT_COUNT_DATA: `${baseURL}/query/organization/#org-id#/environment/cloud/#cloud#/landing-zone/#landingZone#/count`,
  ADD_LANDING_ZONE: `${baseURL}/landingzone`,
  INFRA_TOPOLOGY_CLOUD_ELEMENT_LIST: `${baseURL}/query/organization/#org-id#/infra-topology/landing-zone/#landing-zone-id#/product-enclave/#product-enclave#/cloud-elements`,
  INFRA_TOPOLOGY_CATEGORY_WISE_VIEW: `${baseURL}/query/organization/#org-id#/infra-topology/landing-zone/#landing-zone-id#/product-enclave/#product-enclave#/category-wise-summary`,
  INFRA_TOPOLOGY_DB_CATEGORIES: `${baseURL}/db-category`,
  INFRA_TOPOLOGY_LAMBDA_TABLE_DATA: `${baseURL}/cloud-element/search?elementType=#element-type#&landingzoneId=#landing-zone#&productEnclaveId=#product-enclave#`,
  INFRA_TOPOLOGY_GLOBAL_SERVICES_DATA: `${baseURL}/query/organization/#org-id#/infra-topology/landing-zone-id/#landing-zone-id#/global-service-category-wise-summary`,
  INFRA_TOPOLOGY_GLOBAL_SERVICES_CLOUD_ELEMENT_SEARCH: `${baseURL}/cloud-element/search?elementType=#element-type#`,
  ENVIRONMENTS_APPLICATIONS_TABLE_DATA: `${baseURL}/query/organization/#org-id#/application-topology/landing-zone-id/#landing-zone-id#`,
  CLOUD_WISE_LANDINGZONE_COUNT: `${baseURL}/query/organization/#org-id#/cloud-wise-landingzone/count`,

  /* AssociateApp  */
  GET_ASSOCIATE_PRODUCT_LIST: `${baseURL}/product/search?departmentId=#department-id#`,
  GET_ASSOCIATE_PRODUCT_ENV: `${baseURL}/product-env/search?productId=#product-id#`,
  GET_ASSOCIATE_MODULES: `${baseURL}/module/search-by-filters?departmentId=#department-id#&productId=#product-id#&productEnvId=#product-env-id#&serviceNature=#service-nature#`,
  GET_ASSOCIATE_MODULES_3_TIER: `${baseURL}//business-element/search-by-filters?departmentId=#department-id#&productId=#product-id#&productEnvId=#product-env-id#&serviceType=#service-type#`,
  GET_ASSOCIATE_MODULE_ELEMENTS: `${baseURL}/business-element/search-by-filters?departmentId=#department-id#&productId=#product-id#&productEnvId=#product-env-id#&moduleId=#module-id#&serviceNature=#service-nature#`,
  CREATE_ASSOCIATE: `${baseURL}/cloud-element/associate`,
  GET_ASSOCIATE_EXISTING_TAG_LIST: `${baseURL}/cloud-element/tag/landing-zone-id/#landing-zone-id#/instance-id/#instance-id#`,
  DELETE_TAG: `${baseURL}/cloud-element/tag/landing-zone-id/#landing-zone-id#/instance-id/#instance-id#/service-id/#service-id#`,

  /* Service View Topology  */
  GET_SERVICE_VIEW: `/query/organization/#org-id#/application-topology/service-view?`,
};

export default config;
