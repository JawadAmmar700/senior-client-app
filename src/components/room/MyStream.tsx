import { TbPinnedOff, TbPinned } from "react-icons/tb";
import { BsMic, BsMicMute } from "react-icons/bs";
import { RootState } from "@/store/configuration";
import { useSelector, useDispatch } from "react-redux";
import { P2P } from "@/lib/P2P";

type MyStreamProps = {
  myVideoStreamRef: React.MutableRefObject<HTMLVideoElement | null>;
  peer: P2P;
  username: string;
  image: string;
};

const MyStream = ({
  username,
  image,
  peer,
  myVideoStreamRef,
}: MyStreamProps) => {
  const { userPin, myCamera, myMuted, myPin } = useSelector(
    (state: RootState) => state.appState
  );
  const dispatch = useDispatch();

  return (
    <div
      className={`w-[150px] h-[100px] mt-5  rounded-lg relative ${
        userPin ? "block" : "hidden"
      }`}
    >
      <video
        id="myStream"
        ref={myVideoStreamRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover -z-30  rounded-lg"
      />
      {!myCamera && (
        <div className="absolute w-full bg-slate-700 h-full inset-0 rounded-lg flex items-center justify-center">
          <img
            src={image}
            alt="user-image"
            className="rounded-full w-10 h-10"
          />
        </div>
      )}
      <div className="absolute inset-0 rounded-lg flex flex-col  w-full h-full justify-start text-white z-50">
        <div className="w-full flex items-center space-x-1 p-1">
          <div className="p-2 rounded-full  backdrop-blur-sm bg-white/10  flex items-center justify-center">
            {myMuted ? (
              <BsMicMute className="w-4 h-4" />
            ) : (
              <BsMic className="w-4 h-4" />
            )}
          </div>
          <button
            id="my-pin"
            onClick={() => peer.pinMyStream(myPin)}
            className="p-2 rounded-full  backdrop-blur-sm bg-white/10  flex items-center justify-center"
          >
            {myPin ? (
              <TbPinnedOff className="w-4 h-4" />
            ) : (
              <TbPinned className="w-4 h-4" />
            )}
          </button>
        </div>
        <p className="absolute bottom-1 right-1 backdrop-blur-sm bg-white/10 rounded-xl px-2 py-0.5 font-bold text-xs">
          {username}
        </p>
      </div>
    </div>
  );
};

export default MyStream;
