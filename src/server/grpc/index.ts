import { credentials, type ServiceError } from "@grpc/grpc-js";
import { env } from "@/env";
import {
  AccountServiceClient,
  type IntrospectSessionRequest,
  type IntrospectSessionResponse,
  type MeRequest,
  type MeResponse,
  type StudentLoginRequest,
  type StudentLoginResponse,
} from "@/generated/intania/auth/account/v1/account";
import {
  type EditStudentRequest,
  type EditStudentResponse,
  type ListStudentMappingRequest,
  type ListStudentMappingResponse,
  StudentServiceClient,
} from "@/generated/intania/auth/student/v1/student";

const addr = env.GRPC_ADDRESS;

const accountClient = new AccountServiceClient(
  addr,
  credentials.createInsecure(),
);
const studentClient = new StudentServiceClient(
  addr,
  credentials.createInsecure(),
);

function r<T>(
  resolve: (response: T) => void,
  reject: (reason?: ServiceError) => void,
) {
  return function (err: ServiceError | null, response: T) {
    if (err) {
      return reject(err);
    }
    return resolve(response);
  };
}

function studentLogin(req: StudentLoginRequest): Promise<StudentLoginResponse> {
  return new Promise((resolve, reject) => {
    accountClient.studentLogin(req, r(resolve, reject));
  });
}

function me(req: MeRequest): Promise<MeResponse> {
  return new Promise((resolve, reject) => {
    accountClient.me(req, r(resolve, reject));
  });
}

function introspectSession(
  req: IntrospectSessionRequest,
): Promise<IntrospectSessionResponse> {
  return new Promise((resolve, reject) => {
    accountClient.introspectSession(req, r(resolve, reject));
  });
}

function listStudentMapping(
  req: ListStudentMappingRequest,
): Promise<ListStudentMappingResponse> {
  return new Promise((resolve, reject) => {
    studentClient.listStudentMapping(req, r(resolve, reject));
  });
}

function updateStudent(req: EditStudentRequest): Promise<EditStudentResponse> {
  return new Promise((resolve, reject) => {
    studentClient.editStudent(req, r(resolve, reject));
  });
}

export const grpc = {
  account: {
    studentLogin,
    me,
    introspectSession,
  },
  student: {
    listStudentMapping,
    updateStudent,
  },
};
