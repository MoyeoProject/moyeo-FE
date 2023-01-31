import { InfoNav } from '../pages/FollowPage';
import { DeveloperBox, InfoBox } from '../styles/InfoBoxStyle';

export const InfoDeveloper = () => {
  return (
    <InfoBox>
      <InfoNav children={'만든이들'} />
      <DeveloperBox>
        <p>열심히 제작했어요</p>
        <div className="developer">
          <div className="devPerson">
            <div>
              <p>성함</p>
              <p>프로젝트 후기</p>
            </div>
            <button>깃허브 가기</button>
          </div>
          <div className="devPerson">
            <div>
              <p>성함</p>
              <p>프로젝트 후기</p>
            </div>
            <button>깃허브 가기</button>
          </div>
          <div className="devPerson">
            <div>
              <p>성함</p>
              <p>프로젝트 후기</p>
            </div>
            <button>깃허브 가기</button>
          </div>
        </div>
      </DeveloperBox>
    </InfoBox>
  );
};
