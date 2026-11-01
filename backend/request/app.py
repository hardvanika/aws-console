"""POST /request: the visitor's request reaches a real Lambda.

Increments a global counter in DynamoDB and returns it with the request id,
so the CloudShell on the site can print a real response.
"""
import json
import os

import boto3

TABLE = boto3.resource("dynamodb").Table(os.environ["TABLE_NAME"])


def handler(event, context):
    result = TABLE.update_item(
        Key={"id": "global"},
        UpdateExpression="ADD visits :one",
        ExpressionAttributeValues={":one": 1},
        ReturnValues="UPDATED_NEW",
    )
    body = {
        "status": 200,
        "visits": int(result["Attributes"]["visits"]),
        "requestId": context.aws_request_id,
        "region": os.environ.get("AWS_REGION", ""),
    }
    return {
        "statusCode": 200,
        "headers": {"content-type": "application/json"},
        "body": json.dumps(body),
    }
