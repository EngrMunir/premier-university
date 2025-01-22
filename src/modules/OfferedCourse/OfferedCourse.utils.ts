import { TSchedule } from "./OfferedCourse.interface"

export const hasTimeConflict = (assignedSchedules:TSchedule[], newSchedule:TSchedule)=>{
    
    for(const schedule of assignedSchedules){
        const existingStartTime = new Date(`1970-0101T${schedule.startTime}`);
        const existingEndTime = new Date(`1970-0101T${schedule.endTime}`);
        const newStarTime = new Date(`1970-01-01T${newSchedule.startTime}`);
        const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);

        if(newStarTime < existingEndTime && newEndTime> existingStartTime){
           return true;
        }
    }
        return false;
}