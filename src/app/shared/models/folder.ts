interface Court {
  city:string
}
interface Judge {
  gender:string
}
interface ProcedureType {
  description:string
}
interface Parties {
  fullName:string;
  adresse:string;
}
interface PropertyReference {}
export interface Lawyer {
  id:number;
  authority:string;
  fullName:string;
}
interface Time {
  title:string
}

export class Folder {
  constructor(
    public fileNumber: string,
    public court: Court,
    public subject: string,
    public judge: Judge,
    public procedureType: ProcedureType,
    public parties: Parties,
    public preliminaryJudgment: string,
    public fees: number,
    public expertiseDate: Date,
    public propertyReference: PropertyReference,
    public expertReportSubmitted: boolean,
    public expenseSheetSubmitted: boolean,
    public accountNumber: string,
    public feesCollected: boolean,
    public lawyer: Lawyer,
    public time: Time
  ) {}
}
