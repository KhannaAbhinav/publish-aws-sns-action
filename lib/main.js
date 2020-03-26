"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const sns_1 = __importDefault(require("aws-sdk/clients/sns"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const topicArn = core.getInput('topicArn');
            const targetArn = core.getInput('targetArn');
            const phoneNumber = core.getInput('phoneNumber');
            const message = core.getInput('message');
            const subject = core.getInput('subject');
            const messageStructure = core.getInput('messageStructure');
            const messageAttributesDataType = core.getInput('messageAttributes_dataType');
            const messageAttributesBinaryValue = core.getInput('messageAttributes_binaryValue');
            const messageAttributesStringValue = core.getInput('messageAttributes_stringValue');
            const endpoint = core.getInput('endpoint');
            const accessKeyId = core.getInput('accessKeyId');
            const secretAccessKey = core.getInput('secretAccessKey');
            const sessionToken = core.getInput('sessionToken');
            const region = core.getInput('region');
            const maxRetries = parseInt(core.getInput('maxRetries'));
            const maxRedirects = parseInt(core.getInput('maxRedirects'));
            const sslEnabled = Boolean(core.getInput('sslEnabled'));
            const retryDelayOptions = {
                base: parseInt(core.getInput('base'))
            };
            const apiVersion = core.getInput('apiVersion');
            const logger = {
                write: console.log,
                log: console.log
            };
            console.debug(`topicArn :  ${topicArn}`);
            console.debug(`targetArn :  ${targetArn}`);
            console.debug(`phoneNumber :  ${phoneNumber}`);
            console.debug(`message :  ${message}`);
            console.debug(`subject :  ${subject}`);
            console.debug(`messageStructure :  ${messageStructure}`);
            console.debug(`MessageAttributes Data Type :  ${messageAttributesDataType}`);
            console.debug(`MessageAttributes Binary Value :  ${messageAttributesBinaryValue}`);
            console.debug(`MessageAttributes String Value :  ${messageAttributesStringValue}`);
            console.debug(`endpoint : ${endpoint}`);
            console.debug(`accessKeyId : ${accessKeyId}`);
            console.debug(`secretAccessKey : ${secretAccessKey}`);
            console.debug(`sessionToken : ${sessionToken}`);
            console.debug(`region : ${region}`);
            console.debug(`maxRetries : ${maxRetries}`);
            console.debug(`maxRedirects : ${maxRedirects}`);
            console.debug(`sslEnabled : ${sslEnabled}`);
            console.debug(`retryDelayOptions : ${retryDelayOptions}`);
            console.debug(`apiVersion : ${apiVersion}`);
            const serviceOptions = {
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
            };
            const snsService = new sns_1.default(serviceOptions);
            const publishParams = {
                Message: message,
                MessageAttributes: {
                    '<String>': {
                        DataType: messageAttributesDataType,
                        BinaryValue: messageAttributesBinaryValue,
                        StringValue: messageAttributesStringValue
                    }
                },
                MessageStructure: messageStructure,
                PhoneNumber: phoneNumber,
                Subject: subject,
                TargetArn: targetArn,
                TopicArn: topicArn
            };
            snsService.publish(publishParams, function (err, data) {
                if (err) {
                    core.error(err.message);
                    core.setFailed(err.message);
                }
                else {
                    core.setOutput('snsOutputMessageId', `${data.MessageId}`);
                }
            });
        }
        catch (error) {
            console.log(error);
            core.setFailed(error.message);
        }
    });
}
main();
