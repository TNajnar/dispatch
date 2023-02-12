import { Timestamp } from "firebase/firestore"

export type TParkedVehicleDoc = {
    id: string;
    nameRail: string;
    vehicles: TVehicleObject[];
}

export type TManageTrainDoc = {
    id: string;
    line: TLineObject[];
    locomotives: TLocomotiveObject;
    vehicles: TVehicleObject[];
}

export type TVehicleObject = {
    id: string;
    spz: string;
    class: string;
    repairDate: Timestamp;
    isVehicle: boolean;
    vehicleDoc: string;
}

export type TLineObject = {
    id: string;
    nameLine: string;
}

export type TLocomotiveObject = {
    id: string;
    lSpz: string;
    repairDate: Timestamp;
    isVehicle: boolean;
}
