import React, { useEffect, useState } from "react";
import { IoPlay } from "react-icons/io5";
import dynamic from "next/dynamic";
// import ReactHlsPlayer from "react-hls-player";
import Axios from "../axios";

import { StreamContainer } from "./stream.style";
const ReactHlsPlayer = dynamic(() => import("react-hls-player"), {
  ssr: false,
});

const Stream = (props) => {
  const [Sconfig, setSConfig] = useState();

  const getSConfig = async () => {
    try {
      const res = await Axios.get("v1/arvan-cloud-stream/" + "1");
    } catch (err) {
      console.log("err :>> ", err);
    }
  };

  useEffect(() => {
    getSConfig();
  }, []);
  return (
    <StreamContainer>
      {console.log("class data", props.classData)}
      {props.classData?.class?.display?.status ||
      props.classData?.class?.class?.display?.status ? (
        <div className="streamBox">
          {console.log(
            "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
          )}
          <div className="r1_iframe_embed">
            {/* <iframe
              src={
                "https://player.arvancloud.com/index.html?config=" +
                props.classData.class.class.ac_stream.config_url
              }
              style={{ border: 0 }}
              name={"test23"}
              frameBorder={"0"}
              allow={
                "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              }
              allowFullScreen={true}
              webkitallowfullscreen={true}
              mozallowfullscreen={true}
            ></iframe> */}

            {props.classData?.class?.class?.ac_stream?.hls_playlist ||
            props.classData?.class?.class?.class?.ac_stream?.hls_playlist ? (
              <ReactHlsPlayer
                src={
                  props.classData?.class?.class?.ac_stream?.hls_playlist ||
                  props.classData?.class?.class?.class?.ac_stream?.hls_playlist
                }
                autoPlay={true}
                controls={true}
                width="auto"
                height="100%"
              />
            ) : null}
          </div>
        </div>
      ) : (
        <div className="stream_warning">
          <span>
            {props.role === "TEACHER"
              ? "استاد عزیز لطفا ابتدا استریم را فعال کنید"
              : "استاد هنوز استریم را فعال نکرده است"}
          </span>
        </div>
      )}
    </StreamContainer>
  );
};

export default Stream;
