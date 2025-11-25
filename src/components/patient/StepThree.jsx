"use client";
import React from "react";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import Label from "@/ui/Label";
import Textarea from "@/ui/Textarea";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Card, CardHeader, CardTitle, CardContent } from "@/ui/Card";

const StepThree = ({
  setPatientInfo,
  patientInfo,
  selectedHospital,
  selectedDoctor,
  selectedDate,
  selectedTime,
  setStep,
}) => {
  const handleSubmit = () => {
    if (!patientInfo.name || !patientInfo.phone) {
      alert("이름과 연락처를 입력해주세요.");
      return;
    }
    alert(" 예약이 완료되었습니다!");
    //   ❗ setStep은 클릭 후 실행되어야 함
    setStep(1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>환자 정보 입력</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>이름</Label>
            <Input
              value={patientInfo.name}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, name: e.target.value })
              }
            />
          </div>
          <div>
            <Label>연락처</Label>
            <Input
              value={patientInfo.phone}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, phone: e.target.value })
              }
            />
          </div>
          <div>
            <Label>생년월일</Label>
            <Input
              type="date"
              value={patientInfo.birthDate}
              onChange={(e) =>
                setPatientInfo({
                  ...patientInfo,
                  birthDate: e.target.value,
                })
              }
            />
          </div>
          <div>
            <Label>증상</Label>
            <Textarea
              value={patientInfo.symptoms}
              onChange={(e) =>
                setPatientInfo({
                  ...patientInfo,
                  symptoms: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">예약 정보 확인</h4>
          <p className="text-sm">
            🏥 병원: {selectedHospital.name}
            <br />
            👨‍⚕️ 의사: {selectedDoctor?.name} ({selectedDoctor?.specialty})
            <br />
            📅 날짜:{" "}
            {selectedDate &&
              format(selectedDate, "yyyy년 MM월 dd일", { locale: ko })}
            <br />⏰ 시간: {selectedTime}
          </p>
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setStep(2)}>
            이전
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!patientInfo.name || !patientInfo.phone}
          >
            예약 완료
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepThree;
