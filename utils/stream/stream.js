import React, { useEffect, useState } from "react";
import { IoPlay } from "react-icons/io5";

import Axios from "../axios";

import { StreamContainer } from "./stream.style";

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
      {props.classData?.class?.class?.ac_stream?.config_url ? (
        <div className="streamBox">
          <div className="r1_iframe_embed">
            <iframe
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
            ></iframe>
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
