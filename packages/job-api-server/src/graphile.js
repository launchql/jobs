import env from './env';
import { NodePlugin } from 'graphile-build';
import PgSimplifyInflectorPlugin from './plugins/PgSimplifyInflectorPlugin';

export const getGraphileSettings = ({
  // connection,
  host,
  port,
  schema,
  simpleInflection = true,
  oppositeBaseNames = true
}) => {
  const plugins = [];
  if (simpleInflection) {
    plugins.push(PgSimplifyInflectorPlugin);
  }
  return {
    graphileBuildOptions: {
      pgSimplifyOppositeBaseNames: oppositeBaseNames ? true : false
    },
    appendPlugins: plugins.length > 0 ? plugins : undefined,
    skipPlugins: [NodePlugin],
    dynamicJson: true,
    disableGraphiql: false,
    enhanceGraphiql: true,
    graphiql: true,
    watch: false,
    // connection,
    port,
    host,
    schema,
    ignoreRBAC: false,
    showErrorStack: false,
    extendedErrors: false,
    disableQueryLog: false,
    includeExtensionResources: true,
    setofFunctionsContainNulls: false,
    // https://github.com/graphile/postgraphile/issues/1073
    retryOnInitFail: false,
    handleSeriousError(error) {
      throw error;
    },
    additionalGraphQLContextFromRequest(req, res) {
      return { req, res, env };
    },
    async pgSettings(req) {
      return { role: 'administrator' };
    }
  };
};
