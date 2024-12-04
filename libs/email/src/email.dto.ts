import { createTransport } from 'nodemailer';

export type EmailTransportParams = Parameters<typeof createTransport>;

export type EmailTransporter = ReturnType<typeof createTransport>;

export type EmailMailOption = Parameters<ReturnType<typeof createTransport>['sendMail']>[0];
