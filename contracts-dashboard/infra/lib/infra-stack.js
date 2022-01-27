const cdk = require('@aws-cdk/core');
const s3 = require('@aws-cdk/aws-s3')
const dynamodb = require('@aws-cdk/aws-dynamodb')

class InfraStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new s3.Bucket(this, 'contracts-dashboard', {
      versioned : true
    });
    new dynamodb.Table(this, 'contracts-dashboard-table', {
      partitionKey : { name : 'contract id', type : dynamodb.AttributeType.STRING },
      sortKey : { name : 'contract name', type : dynamodb.AttributeType.STRING }
    })
  }
}

module.exports = { InfraStack }
