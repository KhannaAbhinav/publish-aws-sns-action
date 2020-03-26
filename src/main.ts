import * as core from '@actions/core'
import * as aws from 'aws-sdk'
import sns, {ClientConfiguration, PublishInput, PublishResponse} from 'aws-sdk/clients/sns'
import {RetryDelayOptions, Logger} from 'aws-sdk/lib/config'

async function main(): Promise<void> {
  try {
    const topicArn = core.getInput('topicArn')
    const targetArn = core.getInput('targetArn')
    const phoneNumber = core.getInput('phoneNumber')
    const message = core.getInput('message')
    const subject = core.getInput('subject')
    const messageStructure = core.getInput('messageStructure')
    const messageAttributesDataType = core.getInput('messageAttributes_dataType')
    const messageAttributesBinaryValue = core.getInput('messageAttributes_binaryValue')
    const messageAttributesStringValue = core.getInput('messageAttributes_stringValue')

    const endpoint = core.getInput('endpoint')
    const accessKeyId = core.getInput('accessKeyId')
    const secretAccessKey = core.getInput('secretAccessKey')
    const sessionToken = core.getInput('sessionToken')
    const region = core.getInput('region')
    const maxRetries = parseInt(core.getInput('maxRetries'))
    const maxRedirects = parseInt(core.getInput('maxRedirects'))
    const sslEnabled = Boolean(core.getInput('sslEnabled'))

    const retryDelayOptions: RetryDelayOptions = {
      base: parseInt(core.getInput('base'))
    }

    const apiVersion = core.getInput('apiVersion')

    const logger: Logger = {
      write: console.log,
      log: console.log
    }

    console.debug(`topicArn :  ${topicArn}`)
    console.debug(`targetArn :  ${targetArn}`)
    console.debug(`phoneNumber :  ${phoneNumber}`)
    console.debug(`message :  ${message}`)
    console.debug(`subject :  ${subject}`)
    console.debug(`messageStructure :  ${messageStructure}`)
    console.debug(`MessageAttributes Data Type :  ${messageAttributesDataType}`)
    console.debug(`MessageAttributes Binary Value :  ${messageAttributesBinaryValue}`)
    console.debug(`MessageAttributes String Value :  ${messageAttributesStringValue}`)

    console.debug(`endpoint : ${endpoint}`)
    console.debug(`accessKeyId : ${accessKeyId}`)
    console.debug(`secretAccessKey : ${secretAccessKey}`)
    console.debug(`sessionToken : ${sessionToken}`)
    console.debug(`region : ${region}`)
    console.debug(`maxRetries : ${maxRetries}`)
    console.debug(`maxRedirects : ${maxRedirects}`)
    console.debug(`sslEnabled : ${sslEnabled}`)

    console.debug(`retryDelayOptions : ${retryDelayOptions}`)

    console.debug(`apiVersion : ${apiVersion}`)

    const serviceOptions: ClientConfiguration = {
      endpoint,
      accessKeyId,
      secretAccessKey,
      sessionToken,
      region,
      maxRetries,
      maxRedirects,
      sslEnabled,
      retryDelayOptions,
      apiVersion,
      logger
    }

    const snsService = new sns(serviceOptions)

    const publishParams: PublishInput = {
      Message: message,
      
      // unsure on the usage
      // MessageAttributes: {
      //   '<String>': {
      //     DataType: messageAttributesDataType,
      //     BinaryValue: messageAttributesBinaryValue,
      //     StringValue: messageAttributesStringValue
      //   }
      // },
      MessageStructure: messageStructure,
      PhoneNumber: phoneNumber,
      Subject: subject,
      TargetArn: targetArn,
      TopicArn: topicArn
    }

    snsService.publish(publishParams, function(err: aws.AWSError, data: PublishResponse) {
      if (err) {
        core.error(err.message)
        core.setFailed(err.message)
      } else {
        core.setOutput('snsOutputMessageId', `${data.MessageId}`)
      }
    })
  } catch (error) {
    console.log(error)
    core.setFailed(error.message)
  }
}

main()
