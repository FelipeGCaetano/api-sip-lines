export type FilterOperator = "=" | ">=" | ">" | "<=" | "<" | "L" | "!=";
export type ConditionOperator = "AND" | "OR";

export interface IxcFilterParams {
    TB: string
    OP: FilterOperator
    P: string
    C: ConditionOperator
    G: string
}

export interface SipOSResult {
    id: string,
    ClientId: string,
    assignee: string,
    Status: string
}