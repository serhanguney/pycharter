import React, { useEffect, useContext, useState } from "react";
import { animate, motion, useTransform, useMotionValue } from "framer-motion";
import { Portfolio } from "../context";

export default function Loading() {
  const { portfolio, setPortfolio } = useContext(Portfolio);
  const [reference, setReference] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const wheelVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: { duration: 3, ease: [0.77, 0, 0.18, 1] },
    },
  };

  const t = useMotionValue(0);
  const transformText = useTransform(
    t,
    [0, 250, 500, 750],
    [
      "linear-gradient(to right ,#FFFFFF , #FFFFFF,#FFFFFF )",
      "linear-gradient(to right ,#0091B1 , #FFFFFF,#FFFFFF )",
      "linear-gradient(to right ,#FFFFFF , #0091B1 ,#FFFFFF )",
      "linear-gradient(to right ,#FFFFFF,#FFFFFF,#0091B1 )",
    ]
  );
  useEffect(() => {
    setReference(
      document.querySelector(".description").getBoundingClientRect()
    );
    animate(t, 750, {
      delay: 1,
      duration: 1,
      ease: [0.49, 0.25, 0.7, 0.9],
    });
  }, []);
  return (
    <motion.div
      className="loading-page"
      initial={{
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: "rgba(255,255,255,1)",
        opacity: 1,
      }}
      animate={{
        x: reference.x,
        y: reference.y,
        width: reference.width,
        height: reference.height,
        backgroundColor: "rgba(255,255,255,0.75)",
        opacity: 0,
        transition: {
          opacity: { delay: 5.5, duration: 0.5 },
          delay: 4.5,
          duration: 1.5,
          ease: [0.77, 0, 0.18, 1],
          onComplete: () => setPortfolio({ ...portfolio, loading: false }),
        },
      }}
    >
      <motion.svg
        width="280"
        height="250"
        viewBox="0 0 280 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.g
          id="Group 11"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, transition: { delay: 2.2 } }}
        >
          <motion.g
            id="Wheel"
            initial="initial"
            animate="animate"
            variants={wheelVariants}
          >
            <mask
              id="path-1-outside-1"
              maskUnits="userSpaceOnUse"
              x="31.8273"
              y="0"
              width="177"
              height="177"
              fill="black"
            >
              <rect fill="white" x="31.8273" width="177" height="177" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M115.101 6.90531C114.525 3.83663 116.88 1 120.002 1C123.124 1 125.478 3.83662 124.903 6.90531L123.923 12.1282C123.598 13.8617 123.42 15.6195 123.391 17.383L123.231 27.0982C123.216 28.016 123.926 28.7808 124.84 28.8621C137.507 29.9891 149.042 35.0467 158.22 42.8068C158.923 43.4014 159.97 43.3659 160.611 42.7047L167.456 35.6441C168.704 34.3566 169.839 32.9639 170.848 31.4814L173.812 27.1252C175.569 24.5441 179.238 24.1938 181.452 26.396C183.665 28.5982 183.333 32.2695 180.76 34.039L176.382 37.0505C174.929 38.0501 173.563 39.1706 172.299 40.4L165.222 47.2806C164.56 47.9245 164.528 48.9753 165.128 49.6774C173.007 58.8907 178.147 70.5161 179.288 83.2926C179.37 84.2044 180.131 84.9136 181.046 84.9016L190.671 84.7763C192.464 84.7529 194.252 84.575 196.014 84.2446L201.193 83.2735C204.262 82.6981 207.099 85.0523 207.099 88.1745C207.099 91.2966 204.262 93.6508 201.193 93.0754L195.97 92.0961C194.237 91.7711 192.479 91.5931 190.716 91.5639L181.141 91.4057C180.211 91.3904 179.441 92.1189 179.374 93.0464C178.455 105.923 173.478 117.678 165.714 127.038C165.131 127.741 165.17 128.776 165.824 129.413L172.337 135.758C173.621 137.01 175.011 138.148 176.491 139.161L180.84 142.136C183.416 143.899 183.757 147.57 181.55 149.777C179.342 151.985 175.672 151.644 173.909 149.067L170.908 144.682C169.912 143.226 168.795 141.857 167.569 140.59L161.303 134.114C160.656 133.444 159.594 133.416 158.891 134.028C149.604 142.117 137.806 147.399 124.821 148.551C123.909 148.631 123.199 149.393 123.211 150.308L123.322 158.844C123.346 160.637 123.524 162.424 123.854 164.187L124.825 169.366C125.401 172.435 123.046 175.271 119.924 175.271C116.802 175.271 114.448 172.435 115.023 169.366L116.003 164.143C116.328 162.41 116.506 160.652 116.535 158.888L116.675 150.394C116.69 149.465 115.963 148.695 115.036 148.628C101.966 147.68 90.0555 142.551 80.6355 134.572C79.9324 133.976 78.8847 134.011 78.2433 134.673L72.4707 140.627C71.2225 141.915 70.0876 143.308 69.0787 144.79L66.114 149.146C64.3574 151.727 60.6878 152.078 58.4746 149.875C56.2614 147.673 56.5935 144.002 59.1658 142.232L63.5439 139.221C64.9971 138.221 66.3631 137.101 67.6276 135.871L73.6081 130.057C74.2696 129.413 74.3023 128.364 73.7038 127.662C65.6358 118.198 60.4533 106.198 59.5174 93.0256C59.4517 92.1002 58.6848 91.3723 57.7572 91.3843L49.2549 91.4951C47.4619 91.5184 45.6742 91.6963 43.9117 92.0268L38.7326 92.9979C35.6639 93.5733 32.8273 91.2191 32.8273 88.0969C32.8273 84.9747 35.6639 82.6206 38.7326 83.1959L43.9555 84.1752C45.6889 84.5003 47.4468 84.6783 49.2102 84.7074L57.8457 84.8501C58.7628 84.8653 59.5272 84.156 59.6095 83.2425C60.7779 70.2795 66.0635 58.5038 74.1487 49.2331C74.7597 48.5325 74.7333 47.4732 74.0674 46.8245L67.5894 40.5131C66.3051 39.2617 64.9152 38.1234 63.4352 37.1108L59.0864 34.1353C56.5096 32.3722 56.1685 28.7018 58.3762 26.4941C60.5839 24.2864 64.2544 24.6275 66.0174 27.2043L69.0181 31.5899C70.014 33.0454 71.1311 34.4143 72.3574 35.6819L78.7617 42.3014C79.3978 42.9588 80.4359 42.9999 81.1403 42.4163C90.4921 34.6686 102.23 29.7007 115.088 28.7789C116.013 28.7126 116.741 27.946 116.729 27.0188L116.604 17.4276C116.58 15.6346 116.402 13.8469 116.072 12.0844L115.101 6.90531ZM168.752 84.1676C169.806 84.2345 170.682 83.3521 170.552 82.304C169.336 72.4982 165.363 63.5471 159.434 56.2505C158.79 55.4577 157.596 55.446 156.901 56.1946C149.253 64.4329 142.083 71.3768 133.309 78.8313C132.631 79.4074 132.509 80.4013 132.943 81.1779C133.392 81.9817 133.772 82.8299 134.073 83.7141C134.353 84.5339 135.139 85.1017 136.001 85.0138C147.641 83.8263 157.653 83.4628 168.752 84.1676ZM134.423 92.5195C134.647 91.6364 135.45 90.9902 136.358 91.0652C147.774 92.0075 157.733 92.1782 168.966 91.7792C169.98 91.7432 170.812 92.5857 170.716 93.5956C169.779 103.553 166.005 112.686 160.213 120.178C159.564 121.017 158.314 121.022 157.615 120.225C150.247 111.809 142.92 104.959 133.873 97.5641C133.211 97.0233 133.053 96.0828 133.418 95.3106C133.839 94.4234 134.177 93.4897 134.423 92.5195ZM81.9869 121.2C81.2931 121.953 80.0955 121.944 79.4497 121.149C73.2731 113.543 69.2221 104.142 68.2013 93.8495C68.0983 92.8109 68.9746 91.954 70.0158 92.0266C81.1524 92.803 91.1163 92.5103 102.594 91.3905C103.497 91.3023 104.308 91.9317 104.548 92.8072C104.864 93.9564 105.309 95.0521 105.867 96.0775C106.286 96.8486 106.162 97.8259 105.496 98.3976C96.8369 105.828 89.6992 112.823 81.9869 121.2ZM105.758 78.466C106.469 79.0489 106.592 80.084 106.126 80.8764C105.579 81.8048 105.126 82.7954 104.781 83.835C104.511 84.6482 103.744 85.2196 102.89 85.151C91.4498 84.2327 81.4322 84.093 70.0473 84.5257C69.0174 84.5648 68.1777 83.6977 68.2971 82.674C69.4721 72.6016 73.5536 63.4166 79.6806 55.9799C80.342 55.1772 81.562 55.191 82.2468 55.9738C89.5564 64.3309 96.8207 71.1422 105.758 78.466ZM127.457 101.92C128.239 101.444 129.271 101.55 129.865 102.248C137.253 110.931 144.187 118.074 152.455 125.751C153.197 126.44 153.193 127.621 152.415 128.27C144.994 134.46 135.805 138.602 125.717 139.827C124.666 139.954 123.785 139.072 123.859 138.017C124.635 126.819 124.331 116.803 123.191 105.235C123.107 104.377 123.671 103.596 124.485 103.315C125.531 102.955 126.526 102.485 127.457 101.92ZM116.814 71.8311C116.906 72.7391 116.272 73.5547 115.392 73.7937C114.436 74.0529 113.518 74.4014 112.646 74.8297C111.881 75.2051 110.942 75.0619 110.391 74.4122C102.932 65.6148 95.9596 58.412 87.6459 50.6827C86.8893 49.9793 86.9124 48.7693 87.7258 48.1325C95.1677 42.306 104.253 38.4826 114.171 37.4734C115.207 37.3679 116.066 38.2385 115.999 39.278C115.294 50.3194 115.646 60.2802 116.814 71.8311ZM115.511 103.649C116.384 103.878 117.02 104.674 116.949 105.574C116.053 116.918 115.924 126.886 116.359 138.219C116.398 139.235 115.555 140.07 114.543 139.974C104.321 139.009 94.9694 135.055 87.3698 128.997C86.5474 128.342 86.5525 127.105 87.3451 126.413C95.7952 119.043 102.638 111.76 109.96 102.815C110.52 102.132 111.503 101.988 112.285 102.398C113.299 102.93 114.38 103.352 115.511 103.649ZM125.464 37.5543C124.442 37.4354 123.576 38.2719 123.612 39.2999C124.008 50.5812 123.826 60.5881 122.863 72.0956C122.791 72.958 123.371 73.7331 124.195 73.9988C125.057 74.2768 125.885 74.6284 126.673 75.0462C127.46 75.4632 128.452 75.3185 129.012 74.6267C136.358 65.5615 143.138 58.2239 151.42 50.8793C152.205 50.1834 152.203 48.9508 151.38 48.2999C144.084 42.5258 135.187 38.6859 125.464 37.5543ZM129.747 88.7055C129.747 94.3939 125.136 99.0053 119.448 99.0053C113.759 99.0053 109.148 94.3939 109.148 88.7055C109.148 83.017 113.759 78.4057 119.448 78.4057C125.136 78.4057 129.747 83.017 129.747 88.7055Z"
              />
            </mask>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M115.101 6.90531C114.525 3.83663 116.88 1 120.002 1C123.124 1 125.478 3.83662 124.903 6.90531L123.923 12.1282C123.598 13.8617 123.42 15.6195 123.391 17.383L123.231 27.0982C123.216 28.016 123.926 28.7808 124.84 28.8621C137.507 29.9891 149.042 35.0467 158.22 42.8068C158.923 43.4014 159.97 43.3659 160.611 42.7047L167.456 35.6441C168.704 34.3566 169.839 32.9639 170.848 31.4814L173.812 27.1252C175.569 24.5441 179.238 24.1938 181.452 26.396C183.665 28.5982 183.333 32.2695 180.76 34.039L176.382 37.0505C174.929 38.0501 173.563 39.1706 172.299 40.4L165.222 47.2806C164.56 47.9245 164.528 48.9753 165.128 49.6774C173.007 58.8907 178.147 70.5161 179.288 83.2926C179.37 84.2044 180.131 84.9136 181.046 84.9016L190.671 84.7763C192.464 84.7529 194.252 84.575 196.014 84.2446L201.193 83.2735C204.262 82.6981 207.099 85.0523 207.099 88.1745C207.099 91.2966 204.262 93.6508 201.193 93.0754L195.97 92.0961C194.237 91.7711 192.479 91.5931 190.716 91.5639L181.141 91.4057C180.211 91.3904 179.441 92.1189 179.374 93.0464C178.455 105.923 173.478 117.678 165.714 127.038C165.131 127.741 165.17 128.776 165.824 129.413L172.337 135.758C173.621 137.01 175.011 138.148 176.491 139.161L180.84 142.136C183.416 143.899 183.757 147.57 181.55 149.777C179.342 151.985 175.672 151.644 173.909 149.067L170.908 144.682C169.912 143.226 168.795 141.857 167.569 140.59L161.303 134.114C160.656 133.444 159.594 133.416 158.891 134.028C149.604 142.117 137.806 147.399 124.821 148.551C123.909 148.631 123.199 149.393 123.211 150.308L123.322 158.844C123.346 160.637 123.524 162.424 123.854 164.187L124.825 169.366C125.401 172.435 123.046 175.271 119.924 175.271C116.802 175.271 114.448 172.435 115.023 169.366L116.003 164.143C116.328 162.41 116.506 160.652 116.535 158.888L116.675 150.394C116.69 149.465 115.963 148.695 115.036 148.628C101.966 147.68 90.0555 142.551 80.6355 134.572C79.9324 133.976 78.8847 134.011 78.2433 134.673L72.4707 140.627C71.2225 141.915 70.0876 143.308 69.0787 144.79L66.114 149.146C64.3574 151.727 60.6878 152.078 58.4746 149.875C56.2614 147.673 56.5935 144.002 59.1658 142.232L63.5439 139.221C64.9971 138.221 66.3631 137.101 67.6276 135.871L73.6081 130.057C74.2696 129.413 74.3023 128.364 73.7038 127.662C65.6358 118.198 60.4533 106.198 59.5174 93.0256C59.4517 92.1002 58.6848 91.3723 57.7572 91.3843L49.2549 91.4951C47.4619 91.5184 45.6742 91.6963 43.9117 92.0268L38.7326 92.9979C35.6639 93.5733 32.8273 91.2191 32.8273 88.0969C32.8273 84.9747 35.6639 82.6206 38.7326 83.1959L43.9555 84.1752C45.6889 84.5003 47.4468 84.6783 49.2102 84.7074L57.8457 84.8501C58.7628 84.8653 59.5272 84.156 59.6095 83.2425C60.7779 70.2795 66.0635 58.5038 74.1487 49.2331C74.7597 48.5325 74.7333 47.4732 74.0674 46.8245L67.5894 40.5131C66.3051 39.2617 64.9152 38.1234 63.4352 37.1108L59.0864 34.1353C56.5096 32.3722 56.1685 28.7018 58.3762 26.4941C60.5839 24.2864 64.2544 24.6275 66.0174 27.2043L69.0181 31.5899C70.014 33.0454 71.1311 34.4143 72.3574 35.6819L78.7617 42.3014C79.3978 42.9588 80.4359 42.9999 81.1403 42.4163C90.4921 34.6686 102.23 29.7007 115.088 28.7789C116.013 28.7126 116.741 27.946 116.729 27.0188L116.604 17.4276C116.58 15.6346 116.402 13.8469 116.072 12.0844L115.101 6.90531ZM168.752 84.1676C169.806 84.2345 170.682 83.3521 170.552 82.304C169.336 72.4982 165.363 63.5471 159.434 56.2505C158.79 55.4577 157.596 55.446 156.901 56.1946C149.253 64.4329 142.083 71.3768 133.309 78.8313C132.631 79.4074 132.509 80.4013 132.943 81.1779C133.392 81.9817 133.772 82.8299 134.073 83.7141C134.353 84.5339 135.139 85.1017 136.001 85.0138C147.641 83.8263 157.653 83.4628 168.752 84.1676ZM134.423 92.5195C134.647 91.6364 135.45 90.9902 136.358 91.0652C147.774 92.0075 157.733 92.1782 168.966 91.7792C169.98 91.7432 170.812 92.5857 170.716 93.5956C169.779 103.553 166.005 112.686 160.213 120.178C159.564 121.017 158.314 121.022 157.615 120.225C150.247 111.809 142.92 104.959 133.873 97.5641C133.211 97.0233 133.053 96.0828 133.418 95.3106C133.839 94.4234 134.177 93.4897 134.423 92.5195ZM81.9869 121.2C81.2931 121.953 80.0955 121.944 79.4497 121.149C73.2731 113.543 69.2221 104.142 68.2013 93.8495C68.0983 92.8109 68.9746 91.954 70.0158 92.0266C81.1524 92.803 91.1163 92.5103 102.594 91.3905C103.497 91.3023 104.308 91.9317 104.548 92.8072C104.864 93.9564 105.309 95.0521 105.867 96.0775C106.286 96.8486 106.162 97.8259 105.496 98.3976C96.8369 105.828 89.6992 112.823 81.9869 121.2ZM105.758 78.466C106.469 79.0489 106.592 80.084 106.126 80.8764C105.579 81.8048 105.126 82.7954 104.781 83.835C104.511 84.6482 103.744 85.2196 102.89 85.151C91.4498 84.2327 81.4322 84.093 70.0473 84.5257C69.0174 84.5648 68.1777 83.6977 68.2971 82.674C69.4721 72.6016 73.5536 63.4166 79.6806 55.9799C80.342 55.1772 81.562 55.191 82.2468 55.9738C89.5564 64.3309 96.8207 71.1422 105.758 78.466ZM127.457 101.92C128.239 101.444 129.271 101.55 129.865 102.248C137.253 110.931 144.187 118.074 152.455 125.751C153.197 126.44 153.193 127.621 152.415 128.27C144.994 134.46 135.805 138.602 125.717 139.827C124.666 139.954 123.785 139.072 123.859 138.017C124.635 126.819 124.331 116.803 123.191 105.235C123.107 104.377 123.671 103.596 124.485 103.315C125.531 102.955 126.526 102.485 127.457 101.92ZM116.814 71.8311C116.906 72.7391 116.272 73.5547 115.392 73.7937C114.436 74.0529 113.518 74.4014 112.646 74.8297C111.881 75.2051 110.942 75.0619 110.391 74.4122C102.932 65.6148 95.9596 58.412 87.6459 50.6827C86.8893 49.9793 86.9124 48.7693 87.7258 48.1325C95.1677 42.306 104.253 38.4826 114.171 37.4734C115.207 37.3679 116.066 38.2385 115.999 39.278C115.294 50.3194 115.646 60.2802 116.814 71.8311ZM115.511 103.649C116.384 103.878 117.02 104.674 116.949 105.574C116.053 116.918 115.924 126.886 116.359 138.219C116.398 139.235 115.555 140.07 114.543 139.974C104.321 139.009 94.9694 135.055 87.3698 128.997C86.5474 128.342 86.5525 127.105 87.3451 126.413C95.7952 119.043 102.638 111.76 109.96 102.815C110.52 102.132 111.503 101.988 112.285 102.398C113.299 102.93 114.38 103.352 115.511 103.649ZM125.464 37.5543C124.442 37.4354 123.576 38.2719 123.612 39.2999C124.008 50.5812 123.826 60.5881 122.863 72.0956C122.791 72.958 123.371 73.7331 124.195 73.9988C125.057 74.2768 125.885 74.6284 126.673 75.0462C127.46 75.4632 128.452 75.3185 129.012 74.6267C136.358 65.5615 143.138 58.2239 151.42 50.8793C152.205 50.1834 152.203 48.9508 151.38 48.2999C144.084 42.5258 135.187 38.6859 125.464 37.5543ZM129.747 88.7055C129.747 94.3939 125.136 99.0053 119.448 99.0053C113.759 99.0053 109.148 94.3939 109.148 88.7055C109.148 83.017 113.759 78.4057 119.448 78.4057C125.136 78.4057 129.747 83.017 129.747 88.7055Z"
              fill="#0091B1"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M115.101 6.90531C114.525 3.83663 116.88 1 120.002 1C123.124 1 125.478 3.83662 124.903 6.90531L123.923 12.1282C123.598 13.8617 123.42 15.6195 123.391 17.383L123.231 27.0982C123.216 28.016 123.926 28.7808 124.84 28.8621C137.507 29.9891 149.042 35.0467 158.22 42.8068C158.923 43.4014 159.97 43.3659 160.611 42.7047L167.456 35.6441C168.704 34.3566 169.839 32.9639 170.848 31.4814L173.812 27.1252C175.569 24.5441 179.238 24.1938 181.452 26.396C183.665 28.5982 183.333 32.2695 180.76 34.039L176.382 37.0505C174.929 38.0501 173.563 39.1706 172.299 40.4L165.222 47.2806C164.56 47.9245 164.528 48.9753 165.128 49.6774C173.007 58.8907 178.147 70.5161 179.288 83.2926C179.37 84.2044 180.131 84.9136 181.046 84.9016L190.671 84.7763C192.464 84.7529 194.252 84.575 196.014 84.2446L201.193 83.2735C204.262 82.6981 207.099 85.0523 207.099 88.1745C207.099 91.2966 204.262 93.6508 201.193 93.0754L195.97 92.0961C194.237 91.7711 192.479 91.5931 190.716 91.5639L181.141 91.4057C180.211 91.3904 179.441 92.1189 179.374 93.0464C178.455 105.923 173.478 117.678 165.714 127.038C165.131 127.741 165.17 128.776 165.824 129.413L172.337 135.758C173.621 137.01 175.011 138.148 176.491 139.161L180.84 142.136C183.416 143.899 183.757 147.57 181.55 149.777C179.342 151.985 175.672 151.644 173.909 149.067L170.908 144.682C169.912 143.226 168.795 141.857 167.569 140.59L161.303 134.114C160.656 133.444 159.594 133.416 158.891 134.028C149.604 142.117 137.806 147.399 124.821 148.551C123.909 148.631 123.199 149.393 123.211 150.308L123.322 158.844C123.346 160.637 123.524 162.424 123.854 164.187L124.825 169.366C125.401 172.435 123.046 175.271 119.924 175.271C116.802 175.271 114.448 172.435 115.023 169.366L116.003 164.143C116.328 162.41 116.506 160.652 116.535 158.888L116.675 150.394C116.69 149.465 115.963 148.695 115.036 148.628C101.966 147.68 90.0555 142.551 80.6355 134.572C79.9324 133.976 78.8847 134.011 78.2433 134.673L72.4707 140.627C71.2225 141.915 70.0876 143.308 69.0787 144.79L66.114 149.146C64.3574 151.727 60.6878 152.078 58.4746 149.875C56.2614 147.673 56.5935 144.002 59.1658 142.232L63.5439 139.221C64.9971 138.221 66.3631 137.101 67.6276 135.871L73.6081 130.057C74.2696 129.413 74.3023 128.364 73.7038 127.662C65.6358 118.198 60.4533 106.198 59.5174 93.0256C59.4517 92.1002 58.6848 91.3723 57.7572 91.3843L49.2549 91.4951C47.4619 91.5184 45.6742 91.6963 43.9117 92.0268L38.7326 92.9979C35.6639 93.5733 32.8273 91.2191 32.8273 88.0969C32.8273 84.9747 35.6639 82.6206 38.7326 83.1959L43.9555 84.1752C45.6889 84.5003 47.4468 84.6783 49.2102 84.7074L57.8457 84.8501C58.7628 84.8653 59.5272 84.156 59.6095 83.2425C60.7779 70.2795 66.0635 58.5038 74.1487 49.2331C74.7597 48.5325 74.7333 47.4732 74.0674 46.8245L67.5894 40.5131C66.3051 39.2617 64.9152 38.1234 63.4352 37.1108L59.0864 34.1353C56.5096 32.3722 56.1685 28.7018 58.3762 26.4941C60.5839 24.2864 64.2544 24.6275 66.0174 27.2043L69.0181 31.5899C70.014 33.0454 71.1311 34.4143 72.3574 35.6819L78.7617 42.3014C79.3978 42.9588 80.4359 42.9999 81.1403 42.4163C90.4921 34.6686 102.23 29.7007 115.088 28.7789C116.013 28.7126 116.741 27.946 116.729 27.0188L116.604 17.4276C116.58 15.6346 116.402 13.8469 116.072 12.0844L115.101 6.90531ZM168.752 84.1676C169.806 84.2345 170.682 83.3521 170.552 82.304C169.336 72.4982 165.363 63.5471 159.434 56.2505C158.79 55.4577 157.596 55.446 156.901 56.1946C149.253 64.4329 142.083 71.3768 133.309 78.8313C132.631 79.4074 132.509 80.4013 132.943 81.1779C133.392 81.9817 133.772 82.8299 134.073 83.7141C134.353 84.5339 135.139 85.1017 136.001 85.0138C147.641 83.8263 157.653 83.4628 168.752 84.1676ZM134.423 92.5195C134.647 91.6364 135.45 90.9902 136.358 91.0652C147.774 92.0075 157.733 92.1782 168.966 91.7792C169.98 91.7432 170.812 92.5857 170.716 93.5956C169.779 103.553 166.005 112.686 160.213 120.178C159.564 121.017 158.314 121.022 157.615 120.225C150.247 111.809 142.92 104.959 133.873 97.5641C133.211 97.0233 133.053 96.0828 133.418 95.3106C133.839 94.4234 134.177 93.4897 134.423 92.5195ZM81.9869 121.2C81.2931 121.953 80.0955 121.944 79.4497 121.149C73.2731 113.543 69.2221 104.142 68.2013 93.8495C68.0983 92.8109 68.9746 91.954 70.0158 92.0266C81.1524 92.803 91.1163 92.5103 102.594 91.3905C103.497 91.3023 104.308 91.9317 104.548 92.8072C104.864 93.9564 105.309 95.0521 105.867 96.0775C106.286 96.8486 106.162 97.8259 105.496 98.3976C96.8369 105.828 89.6992 112.823 81.9869 121.2ZM105.758 78.466C106.469 79.0489 106.592 80.084 106.126 80.8764C105.579 81.8048 105.126 82.7954 104.781 83.835C104.511 84.6482 103.744 85.2196 102.89 85.151C91.4498 84.2327 81.4322 84.093 70.0473 84.5257C69.0174 84.5648 68.1777 83.6977 68.2971 82.674C69.4721 72.6016 73.5536 63.4166 79.6806 55.9799C80.342 55.1772 81.562 55.191 82.2468 55.9738C89.5564 64.3309 96.8207 71.1422 105.758 78.466ZM127.457 101.92C128.239 101.444 129.271 101.55 129.865 102.248C137.253 110.931 144.187 118.074 152.455 125.751C153.197 126.44 153.193 127.621 152.415 128.27C144.994 134.46 135.805 138.602 125.717 139.827C124.666 139.954 123.785 139.072 123.859 138.017C124.635 126.819 124.331 116.803 123.191 105.235C123.107 104.377 123.671 103.596 124.485 103.315C125.531 102.955 126.526 102.485 127.457 101.92ZM116.814 71.8311C116.906 72.7391 116.272 73.5547 115.392 73.7937C114.436 74.0529 113.518 74.4014 112.646 74.8297C111.881 75.2051 110.942 75.0619 110.391 74.4122C102.932 65.6148 95.9596 58.412 87.6459 50.6827C86.8893 49.9793 86.9124 48.7693 87.7258 48.1325C95.1677 42.306 104.253 38.4826 114.171 37.4734C115.207 37.3679 116.066 38.2385 115.999 39.278C115.294 50.3194 115.646 60.2802 116.814 71.8311ZM115.511 103.649C116.384 103.878 117.02 104.674 116.949 105.574C116.053 116.918 115.924 126.886 116.359 138.219C116.398 139.235 115.555 140.07 114.543 139.974C104.321 139.009 94.9694 135.055 87.3698 128.997C86.5474 128.342 86.5525 127.105 87.3451 126.413C95.7952 119.043 102.638 111.76 109.96 102.815C110.52 102.132 111.503 101.988 112.285 102.398C113.299 102.93 114.38 103.352 115.511 103.649ZM125.464 37.5543C124.442 37.4354 123.576 38.2719 123.612 39.2999C124.008 50.5812 123.826 60.5881 122.863 72.0956C122.791 72.958 123.371 73.7331 124.195 73.9988C125.057 74.2768 125.885 74.6284 126.673 75.0462C127.46 75.4632 128.452 75.3185 129.012 74.6267C136.358 65.5615 143.138 58.2239 151.42 50.8793C152.205 50.1834 152.203 48.9508 151.38 48.2999C144.084 42.5258 135.187 38.6859 125.464 37.5543ZM129.747 88.7055C129.747 94.3939 125.136 99.0053 119.448 99.0053C113.759 99.0053 109.148 94.3939 109.148 88.7055C109.148 83.017 113.759 78.4057 119.448 78.4057C125.136 78.4057 129.747 83.017 129.747 88.7055Z"
              stroke="#EDFCFF"
              strokeWidth="2"
              mask="url(#path-1-outside-1)"
            />
          </motion.g>
          <g id="Waves">
            <path
              id="Subtract"
              d="M2.71655 106.432V249.211H222.446V111.746C208.82 123.071 193.714 127.551 174.38 123.897C158.611 119.003 142.978 111.988 127.639 105.105C82.0312 84.638 39.0179 65.3356 2.71655 106.432C36.244 57.4307 83.8172 78.3416 133.43 100.149C149.863 107.372 166.519 114.693 182.963 119.605C198.077 122.102 208.994 122.848 222.446 111.744C205.971 125.234 195.092 126.543 174.38 123.897C156.355 118.303 141.53 110.978 127.639 105.105C58.5071 72.3976 30.0726 76.7553 2.71655 106.432Z"
              fill="white"
            />
            <g id="Group 10">
              <path
                id="Vector"
                d="M223.304 111.88C209.454 123.738 198.397 123.014 182.963 120.464C116.873 100.722 47.349 42.0585 2.71655 107.291C51.2268 52.3722 111.723 105.312 174.38 124.755C194.121 128.486 209.454 123.738 223.304 111.88Z"
                fill="#0091B1"
                stroke="#A4D8E1"
              />
              <path
                id="Vector_2"
                d="M125.456 116.172C121.164 117.03 114.083 116.172 105.715 112.739C72.2403 99.0055 48.2074 63.8146 1 118.675C58.5072 75.831 73.0986 107.589 102.281 116.172C110.792 118.675 122.023 119.605 125.456 116.172Z"
                fill="#0091B1"
                stroke="#A4D8E1"
              />
              <path
                id="Vector_3"
                d="M277.378 92.9972C272.228 90.4222 253.285 91.6832 244.762 94.7138C226.064 101.363 204.421 130.763 178.672 111.88C209.571 124.755 214.812 99.1682 243.045 87.8473C251.279 84.5455 267.078 81.839 277.378 92.9972Z"
                fill="#0091B1"
                stroke="#A4D8E1"
              />
            </g>
          </g>
        </motion.g>
      </motion.svg>
      <motion.h2
        style={{ backgroundImage: transformText }}
        initial={{ opacity: 1 }}
        animate={{
          opacity: 0,
          transition: { delay: 2 },
        }}
      >
        Private Yacht Charter
      </motion.h2>
    </motion.div>
  );
}
