const DetailButton = ({ data }: any) => {
  const meetingLink = () => {
    // 모임 입장 링크 입력
  };
  const meetingEntrance = () => {
    // 멤버 모임입장, 링크로 이동
    alert(`${data.platform}으로 입장합니다`);
  };

  return (
    <div>
      {data?.master ? (
        <button onClick={meetingLink}>입장 링크를 입력해주세요</button>
      ) : data?.attend ? (
        <button onClick={meetingEntrance}>모임 입장</button>
      ) : (
        <div>모임에 참석한 후 입장 가능합니다</div>
      )}
    </div>
  );
};

export default DetailButton;
