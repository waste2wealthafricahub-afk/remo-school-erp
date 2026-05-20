export default function AdmissionSlip({ student }) {
  return (
    <div>
      <h1>Admission Slip</h1>

      <p>
        Name: {student.student_name}
      </p>

      <p>
        Admission No:
        {student.admission_number}
      </p>

      <button onClick={() => window.print()}>
        Print Slip
      </button>
    </div>
  );
}