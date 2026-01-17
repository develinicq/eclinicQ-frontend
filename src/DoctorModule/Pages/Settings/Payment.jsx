import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, Plus, Minus, Shield, Send } from "lucide-react";
const BasicSVG = (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48.0001" height="47.9574" rx="6" fill="#0D47A1" />
    <ellipse cx="6.54501" cy="5.99479" rx="1.09091" ry="1.08994" fill="white" />
    <ellipse cx="40.3634" cy="13.0793" rx="1.09091" ry="1.08994" fill="white" />
    <ellipse
      cx="32.1822"
      cy="6.53966"
      rx="0.545456"
      ry="0.544971"
      fill="white"
    />
    <ellipse
      cx="11.9996"
      cy="12.5344"
      rx="0.545456"
      ry="0.544971"
      fill="white"
    />
    <ellipse
      cx="3.81792"
      cy="26.1585"
      rx="0.545456"
      ry="0.544971"
      fill="white"
    />
    <ellipse
      cx="40.9087"
      cy="26.1585"
      rx="0.545456"
      ry="0.544971"
      fill="white"
    />
    <ellipse
      cx="44.7271"
      cy="5.99474"
      rx="0.545456"
      ry="0.544971"
      fill="white"
    />
    <ellipse cx="9.27255" cy="21.7989" rx="1.09091" ry="1.08994" fill="white" />
    <ellipse cx="40.9093" cy="32.6982" rx="1.09091" ry="1.08994" fill="white" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M26.8268 34.0338L21.25 34.1001C18.3974 29.006 13.1335 25.3403 12.6924 18.8177C12.6924 12.7434 18.1815 8.19391 24.0031 8.19391C29.5427 8.19391 35.3206 12.6422 35.3206 18.4902C35.3206 24.7588 29.6581 28.8525 26.8268 34.0338Z"
      fill="url(#paint0_linear_5118_49144)"
    />
    <path
      d="M21.8861 34.0969H21.502V36.3913H21.8861V34.0969Z"
      fill="url(#paint1_linear_5118_49144)"
    />
    <path
      d="M24.1986 34.0969H23.8145V36.3913H24.1986V34.0969Z"
      fill="url(#paint2_linear_5118_49144)"
    />
    <path
      d="M26.2543 34.0969H25.8701V36.3913H26.2543V34.0969Z"
      fill="url(#paint3_linear_5118_49144)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.2324 37.8197C11.2254 35.7075 12.6149 34.7402 14.4046 34.9306C16.2033 35.1853 16.9949 36.1364 16.9442 37.6704C16.8907 38.2888 17.163 38.4597 17.7925 38.1396C18.4582 37.673 19.1492 37.4403 19.9002 37.7557C20.69 38.1136 20.4554 39.2018 21.1812 39.2932L21.8856 42.427L10.8841 42.1955L10.2324 37.8197Z"
      fill="url(#paint4_linear_5118_49144)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M43.4017 47.9998C30.0637 47.9893 16.7258 47.9786 3.38777 47.968C2.85877 46.34 3.69606 45.4706 4.96143 44.8388C1.87812 42.2599 2.99468 37.6382 7.82112 36.9284C9.77162 36.5688 11.5048 37.549 13.1138 39.2934C14.7322 41.5399 16.0732 39.6923 17.5528 39.8918C18.8937 40.002 19.7651 41.0715 20.7112 40.8939L26.6235 39.8385C29.273 38.9784 28.9457 40.9438 30.1227 41.0645C31.332 41.1563 32.2852 39.4681 33.8146 39.2934C34.4354 39.182 34.1597 40.0194 34.7323 40.2224C36.1799 40.5527 36.6031 37.6422 40.2915 38.3351C44.2364 39.2934 46.2649 43.8192 43.4017 47.9998Z"
      fill="url(#paint5_linear_5118_49144)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M21.1826 36.3912H26.6245V41.0353C26.6245 41.6735 26.1019 42.1957 25.4631 42.1957H22.3441C21.7053 42.1957 21.1826 41.6735 21.1826 41.0353V36.3912Z"
      fill="url(#paint6_linear_5118_49144)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M23.2512 34.0763C21.8863 25.4063 20.5555 13.9641 23.6362 8.19391C12.1379 15.1539 18.6683 25.8661 22.4198 34.0763H23.2512Z"
      fill="url(#paint7_linear_5118_49144)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M24.8742 34.0568C26.2391 25.3868 27.5699 13.9446 24.4893 8.17444C35.6249 15.2332 29.1934 25.9184 25.7056 34.0568H24.8742Z"
      fill="url(#paint8_linear_5118_49144)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M24.8857 34.0568L23.2516 34.0761C21.3656 22.2517 21.0844 12.9801 23.6262 8.2001L24.4899 8.17444C28.1004 14.2645 25.7807 27.5429 24.8857 34.0568Z"
      fill="url(#paint9_radial_5118_49144)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.2445 28.9439L20.3927 28.9119C20.3927 28.1319 19.924 28.1088 20.0737 27.6273C20.2916 27.1679 20.1725 26.7803 19.8443 26.6677C19.3517 26.5317 18.7432 26.6197 18.0517 26.8674C17.762 26.9357 17.7228 26.8765 17.6968 26.6009C17.5772 25.8232 16.8429 25.3639 16.1363 25.535C13.5584 26.0235 12.6938 27.7482 13.2445 28.9439Z"
      fill="white"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M28.9834 30.7801H41.8113C42.5786 30.749 42.8974 30.0238 42.7824 28.628C41.9714 25.9912 40.7305 25.021 39.2077 25.1418C38.1152 25.2288 37.2915 26.0142 36.6254 27.2101C35.9284 28.3309 35.1055 28.5892 34.1807 28.1464C33.1121 27.3676 32.0109 27.5008 30.885 28.3146L28.9834 30.7801Z"
      fill="white"
    />
    <defs>
      <linearGradient
        id="paint0_linear_5118_49144"
        x1="12.4414"
        y1="58.9619"
        x2="34.7468"
        y2="58.9619"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00B1BC" />
        <stop offset="1" stop-color="#75D9A3" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_5118_49144"
        x1="21.4977"
        y1="38.5931"
        x2="21.8764"
        y2="38.5931"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.680208" stop-color="#00B1BC" />
        <stop offset="1" stop-color="#75D9A3" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_5118_49144"
        x1="23.8102"
        y1="38.5931"
        x2="24.1889"
        y2="38.5931"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.680208" stop-color="#00B1BC" />
        <stop offset="1" stop-color="#75D9A3" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_5118_49144"
        x1="25.8659"
        y1="38.5931"
        x2="26.2446"
        y2="38.5931"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.680208" stop-color="#00B1BC" />
        <stop offset="1" stop-color="#75D9A3" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_5118_49144"
        x1="10.1031"
        y1="49.6437"
        x2="21.5901"
        y2="49.6437"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00B1BC" />
        <stop offset="1" stop-color="#AFFFD4" />
      </linearGradient>
      <linearGradient
        id="paint5_linear_5118_49144"
        x1="2.76597"
        y1="58.6958"
        x2="43.6926"
        y2="58.6958"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#81F3FB" />
        <stop offset="1" stop-color="#75D9A3" />
      </linearGradient>
      <linearGradient
        id="paint6_linear_5118_49144"
        x1="21.1222"
        y1="47.7662"
        x2="26.4865"
        y2="47.7662"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00B1BC" />
        <stop offset="1" stop-color="#75D9A3" />
      </linearGradient>
      <linearGradient
        id="paint7_linear_5118_49144"
        x1="17.0755"
        y1="58.9152"
        x2="23.4716"
        y2="58.9152"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.232292" stop-color="#54CEAB" />
        <stop offset="1" stop-color="#05A5AF" />
      </linearGradient>
      <linearGradient
        id="paint8_linear_5118_49144"
        x1="24.4199"
        y1="58.8957"
        x2="30.5847"
        y2="58.8957"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.232292" stop-color="#10B6B9" />
        <stop offset="1" stop-color="#75D9A4" />
      </linearGradient>
      <radialGradient
        id="paint9_radial_5118_49144"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(2.30113 1.62098e-05 -3.00876e-06 1322.31 24.0277 58.9336)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00B1BC" />
        <stop offset="1" stop-color="#75D9A3" />
      </radialGradient>
    </defs>
  </svg>
);

const PlusSVG = (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" rx="6" fill="#0D47A1" />
    <circle cx="6.54501" cy="6.00003" r="1.09091" fill="white" />
    <circle cx="40.3634" cy="13.0909" r="1.09091" fill="white" />
    <circle cx="32.1822" cy="6.54545" r="0.545455" fill="white" />
    <circle cx="11.9996" cy="12.5455" r="0.545455" fill="white" />
    <circle cx="3.81792" cy="26.1818" r="0.545455" fill="white" />
    <circle cx="40.9087" cy="26.1818" r="0.545455" fill="white" />
    <circle cx="44.7271" cy="5.99998" r="0.545455" fill="white" />
    <circle cx="9.27255" cy="21.8182" r="1.09091" fill="white" />
    <circle cx="40.9093" cy="32.7273" r="1.09091" fill="white" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M24.095 44.3126V10.3635C22.5718 10.594 21.2004 12.2639 20.0823 16.344V35.7482C19.8394 36.6732 23.3653 44.6793 24.095 44.3126Z"
      fill="url(#paint0_linear_5118_49047)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.13899 29.9188C5.15786 30.1851 5.24911 30.3844 5.5416 30.3974L20.0824 28.7679V21.5651L4.98047 28.0535L5.13899 29.9188Z"
      fill="url(#paint1_linear_5118_49047)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.0026 24.0262C10.3704 24.0262 10.6713 24.3271 10.6713 24.6949V26.7312H9.33398V24.6949C9.33398 24.3271 9.6349 24.0262 10.0026 24.0262Z"
      fill="url(#paint2_linear_5118_49047)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.8659 21.8844C15.2337 21.8844 15.5345 22.1852 15.5345 22.553V24.5893H14.1973V22.553C14.1973 22.1852 14.4981 21.8844 14.8659 21.8844Z"
      fill="url(#paint3_linear_5118_49047)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M21.6185 40.2823L17.8506 42.7548L18.1392 45.3913C18.1392 45.3913 18.1621 46.0752 18.656 45.9536C19.1498 45.832 23.5134 43.851 23.5134 43.851L21.6185 40.2823Z"
      fill="url(#paint4_linear_5118_49047)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16.727 32.0498L16.9399 39.8906C16.9434 40.4104 16.7139 40.626 16.1806 40.4453C14.9379 39.9477 14.2755 39.1827 14.0456 38.2192C13.8203 37.4137 14.8941 36.6694 15.0106 35.6664C15.1296 34.6559 14.3748 34.3369 15.3675 32.6349C15.9259 31.8968 15.7176 31.618 16.249 31.594C16.5034 31.5774 16.6751 31.707 16.727 32.0498Z"
      fill="url(#paint5_linear_5118_49047)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.5412 33.7009V47.9603C10.3622 47.9999 8.99858 47.9603 6.46094 47.9603C6.46094 44.9668 9.51635 44.8602 9.86438 43.4013C9.93539 42.2793 9.2032 41.4024 9.18293 40.174C9.16266 38.9532 10.3275 38.7583 10.5809 37.8112C10.7759 37.1755 9.83131 36.4713 10.4595 35.3114C10.6849 34.7895 11.3205 34.5414 11.546 33.8145C11.8778 33.2097 12.2094 33.2117 12.5412 33.7009Z"
      fill="url(#paint6_linear_5118_49047)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M24.083 44.3126V10.3635C25.6062 10.594 26.9776 12.2639 28.0957 16.344V35.7482C28.3386 36.6732 24.8127 44.6793 24.083 44.3126Z"
      fill="url(#paint7_linear_5118_49047)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M43.0401 29.9188C43.0212 30.1851 42.93 30.3844 42.6375 30.3974L28.0967 28.7679V21.5651L43.1986 28.0535L43.0401 29.9188Z"
      fill="url(#paint8_linear_5118_49047)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M38.1764 24.0262C37.8087 24.0262 37.5078 24.3271 37.5078 24.6949V26.7312H38.8451V24.6949C38.8451 24.3271 38.5442 24.0262 38.1764 24.0262Z"
      fill="url(#paint9_linear_5118_49047)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M33.3142 21.8844C32.9464 21.8844 32.6455 22.1852 32.6455 22.553V24.5893H33.9828V22.553C33.9828 22.1852 33.6819 21.8844 33.3142 21.8844Z"
      fill="url(#paint10_linear_5118_49047)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M26.5599 40.2823L30.3278 42.7548L30.0392 45.3913C30.0392 45.3913 30.0163 46.0752 29.5224 45.9536C29.0285 45.832 24.665 43.851 24.665 43.851L26.5599 40.2823Z"
      fill="url(#paint11_linear_5118_49047)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M31.4523 32.0498L31.2393 39.8906C31.2358 40.4104 31.4653 40.626 31.9986 40.4453C33.2414 39.9477 33.9037 39.1827 34.1336 38.2192C34.359 37.4137 33.2851 36.6694 33.1686 35.6664C33.0496 34.6559 33.8044 34.3369 32.8117 32.6349C32.2533 31.8968 32.4616 31.618 31.9303 31.594C31.6758 31.5774 31.5041 31.707 31.4523 32.0498Z"
      fill="url(#paint12_linear_5118_49047)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M35.6366 33.7009L35.4531 47.9603C37.9077 47.9603 39.2713 47.9603 41.7169 47.9603C41.7169 44.9668 38.6615 44.8602 38.3134 43.4013C38.2425 42.2793 38.9746 41.4024 38.9949 40.174C39.0152 38.9532 37.8503 38.7583 37.597 37.8112C37.4019 37.1755 38.3465 36.4713 37.7184 35.3114C37.4929 34.7895 36.8573 34.5414 36.6318 33.8145C36.3001 33.2097 35.9684 33.2117 35.6366 33.7009Z"
      fill="url(#paint13_linear_5118_49047)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_5118_49047"
        x1="20.0257"
        y1="76.917"
        x2="23.9929"
        y2="76.917"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#75D9A3" />
        <stop offset="0.805208" stop-color="#00B1BC" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_5118_49047"
        x1="4.81294"
        y1="38.8736"
        x2="19.6995"
        y2="38.8736"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#75D9A3" />
        <stop offset="1" stop-color="#00B1BC" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_5118_49047"
        x1="9.31915"
        y1="29.327"
        x2="10.6374"
        y2="29.327"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00B1BC" />
        <stop offset="1" stop-color="#75D9A3" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_5118_49047"
        x1="14.1824"
        y1="27.1851"
        x2="15.5006"
        y2="27.1851"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00B1BC" />
        <stop offset="1" stop-color="#75D9A3" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_5118_49047"
        x1="17.7878"
        y1="51.4246"
        x2="23.3698"
        y2="51.4246"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#75D9A3" />
        <stop offset="0.83125" stop-color="#00B1BC" />
      </linearGradient>
      <linearGradient
        id="paint5_linear_5118_49047"
        x1="13.9822"
        y1="49.0645"
        x2="16.8658"
        y2="49.0645"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#B6E8EB" />
        <stop offset="1" stop-color="#75D9A3" />
      </linearGradient>
      <linearGradient
        id="paint6_linear_5118_49047"
        x1="6.39315"
        y1="68.5278"
        x2="12.4168"
        y2="68.5278"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#B6E8EB" />
        <stop offset="1" stop-color="#75D9A3" />
      </linearGradient>
      <linearGradient
        id="paint7_linear_5118_49047"
        x1="24.0384"
        y1="76.917"
        x2="28.0056"
        y2="76.917"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00B1BC" />
        <stop offset="1" stop-color="#75D9A3" />
      </linearGradient>
      <linearGradient
        id="paint8_linear_5118_49047"
        x1="27.9291"
        y1="38.8736"
        x2="42.8157"
        y2="38.8736"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00B1BC" />
        <stop offset="1" stop-color="#75D9A3" />
      </linearGradient>
      <linearGradient
        id="paint9_linear_5118_49047"
        x1="37.493"
        y1="29.327"
        x2="38.8112"
        y2="29.327"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00B1BC" />
        <stop offset="1" stop-color="#75D9A3" />
      </linearGradient>
      <linearGradient
        id="paint10_linear_5118_49047"
        x1="32.6307"
        y1="27.1851"
        x2="33.9489"
        y2="27.1851"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00B1BC" />
        <stop offset="1" stop-color="#75D9A3" />
      </linearGradient>
      <linearGradient
        id="paint11_linear_5118_49047"
        x1="24.6022"
        y1="51.4246"
        x2="30.1842"
        y2="51.4246"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00B1BC" />
        <stop offset="1" stop-color="#75D9A3" />
      </linearGradient>
      <linearGradient
        id="paint12_linear_5118_49047"
        x1="31.2068"
        y1="49.0645"
        x2="34.0904"
        y2="49.0645"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00B1BC" />
        <stop offset="1" stop-color="#D8FFEA" />
      </linearGradient>
      <linearGradient
        id="paint13_linear_5118_49047"
        x1="35.5382"
        y1="68.5278"
        x2="41.5619"
        y2="68.5278"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00B1BC" />
        <stop offset="1" stop-color="#D8FFEA" />
      </linearGradient>
    </defs>
  </svg>
);

const ProSVG = (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" rx="6" fill="#0D47A1" />
    <circle cx="6.54501" cy="6.00003" r="1.09091" fill="white" />
    <circle cx="40.3634" cy="13.0909" r="1.09091" fill="white" />
    <circle cx="32.1822" cy="6.54545" r="0.545455" fill="white" />
    <circle cx="11.9996" cy="12.5455" r="0.545455" fill="white" />
    <circle cx="3.81792" cy="26.1818" r="0.545455" fill="white" />
    <circle cx="40.9087" cy="26.1818" r="0.545455" fill="white" />
    <circle cx="44.7271" cy="5.99998" r="0.545455" fill="white" />
    <circle cx="9.27255" cy="21.8182" r="1.09091" fill="white" />
    <circle cx="40.9093" cy="32.7273" r="1.09091" fill="white" />
    <g clip-path="url(#clip0_5118_44036)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.1897 9.27277C22.5413 10.381 21.3566 11.6125 20.8096 13.0135H27.4173C26.6983 11.5128 25.5628 10.3081 24.1897 9.27277Z"
        fill="url(#paint0_linear_5118_44036)"
      />
      <path
        opacity="0.5"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M27.9397 36.6399C29.0912 36.7671 29.7094 37.8633 29.7595 39.993C30.3288 39.9084 30.7301 40.1766 30.921 40.8862C31.6688 40.4696 32.4015 40.5562 33.1151 41.2617C34.335 39.2694 35.9001 38.5198 37.8774 39.2549C39.3019 36.8336 41.3484 36.3296 44.1495 38.1546C46.9672 40.6045 47.2563 44.6241 44.0857 47.6956C43.8691 47.8518 43.627 47.959 43.3501 47.9999H5.16281C4.4604 47.9246 3.88118 47.6849 3.41982 47.2871C0.2409 43.4143 1.62836 38.7741 5.09734 37.2924C7.47261 36.4466 8.99913 37.3619 10.0666 39.2092C12.3128 38.6279 13.8517 39.3722 14.79 41.2418C15.5039 40.5833 16.2271 40.4803 16.9582 40.8406C17.3134 40.2435 17.7088 39.9574 18.1326 39.8955C18.1568 38.0385 18.7963 37.0281 19.8876 36.6399L19.9134 25.3892H28.1862L27.9397 36.6399H27.9397Z"
        fill="url(#paint1_linear_5118_44036)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.5985 30.3082L20.8096 26.1978C20.2521 24.7088 19.6948 23.22 19.1373 21.7311C16.5803 24.5898 15.75 27.4926 17.5985 30.3082Z"
        fill="url(#paint2_linear_5118_44036)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.1267 30.4645L24.1135 13.0135L20.809 13.0136C18.6831 16.2306 18.4974 20.689 19.9138 25.3892C20.4188 27.065 21.1309 28.7714 22.0372 30.4627L24.1267 30.4645Z"
        fill="url(#paint3_linear_5118_44036)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M30.6427 30.3082L27.4316 26.1978C27.9891 24.7088 28.5464 23.22 29.1039 21.7311C31.6609 24.5898 32.4912 27.4926 30.6427 30.3082Z"
        fill="url(#paint4_linear_5118_44036)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.1263 30.4645L24.1133 13.0117H27.4169C30.3008 17.3756 29.6642 24.0272 26.2157 30.4627L24.1263 30.4645Z"
        fill="url(#paint5_linear_5118_44036)"
      />
      <path
        d="M24.1382 19.8086C25.2145 19.8086 26.087 18.9334 26.087 17.8537C26.087 16.7741 25.2145 15.8989 24.1382 15.8989C23.0619 15.8989 22.1895 16.7741 22.1895 17.8537C22.1895 18.9334 23.0619 19.8086 24.1382 19.8086Z"
        fill="url(#paint6_linear_5118_44036)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22.5795 36.0418L22.5367 38.9264C22.0805 39.189 21.7949 39.574 21.8205 40.1821C20.2047 40.3508 19.4293 41.5906 19.4654 43.8651C18.885 43.7329 18.3121 43.9411 17.7489 44.6031C17.0808 43.7353 16.0346 43.5309 14.6782 43.8716C14.2651 42.6208 13.3023 41.9896 11.7877 41.9814C9.7283 42.2264 8.73654 43.2982 8.63867 45.0622C8.63867 46.7556 10.0103 47.766 12.0329 47.8845H35.2633C37.8029 48.0251 39.7158 47.2996 39.7158 45.1788C39.4728 43.103 38.3626 42.0366 36.399 41.9632C35.1203 41.9652 34.245 42.6866 33.5856 43.7936C32.3744 43.4251 31.3554 43.7304 30.4882 44.5703C30.0878 43.9671 29.5246 43.7063 28.7459 43.8971C28.9337 41.6503 28.2873 40.314 26.5134 40.2077C26.4278 39.6419 26.1947 39.2847 25.8165 39.1332L25.8158 36.0971L22.5795 36.0418L22.5795 36.0418Z"
        fill="url(#paint7_linear_5118_44036)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.204 37.8034C26.5635 36.0206 27.1601 33.6265 26.2159 30.4626H23.0812H22.037C20.9468 32.9448 21.9722 36.2148 24.204 37.8034Z"
        fill="url(#paint8_linear_5118_44036)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.227 34.2802C25.3657 32.9859 25.4858 31.6777 25.2608 30.4586C24.5123 30.4584 23.8301 30.4629 23.0816 30.4627C22.7288 31.7176 23.1693 32.9865 24.227 34.2802Z"
        fill="white"
        fill-opacity="0.73"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_5118_44036"
        x1="24.5463"
        y1="12.8182"
        x2="24.5463"
        y2="9.81822"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00B1BC" />
        <stop offset="1" stop-color="#75D9A3" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_5118_44036"
        x1="1.14054"
        y1="69.699"
        x2="45.2299"
        y2="69.699"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00B1BC" />
        <stop offset="1" stop-color="#75D9A3" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_5118_44036"
        x1="16.5519"
        y1="38.5396"
        x2="20.7028"
        y2="38.5396"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00B1BC" />
        <stop offset="1" stop-color="#75D9A3" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_5118_44036"
        x1="17.4553"
        y1="21.8183"
        x2="25.6372"
        y2="30.5456"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00B1BC" />
        <stop offset="1" stop-color="#75D9A3" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_5118_44036"
        x1="27.3849"
        y1="38.5396"
        x2="31.5358"
        y2="38.5396"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00B1BC" />
        <stop offset="1" stop-color="#75D9A3" />
      </linearGradient>
      <linearGradient
        id="paint5_linear_5118_44036"
        x1="24.0004"
        y1="20.4547"
        x2="28.364"
        y2="21.0001"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.254909" stop-color="#00B1BC" />
        <stop offset="1" stop-color="#75D9A3" />
      </linearGradient>
      <linearGradient
        id="paint6_linear_5118_44036"
        x1="24.1382"
        y1="15.8989"
        x2="26.1821"
        y2="19.3636"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" />
        <stop offset="1" stop-color="#82DEAD" />
      </linearGradient>
      <linearGradient
        id="paint7_linear_5118_44036"
        x1="24.0009"
        y1="49.6364"
        x2="24.0009"
        y2="36.8182"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00B1BC" />
        <stop offset="0.520897" stop-color="#82DEAC" />
      </linearGradient>
      <linearGradient
        id="paint8_linear_5118_44036"
        x1="24.2732"
        y1="30.2727"
        x2="24.2732"
        y2="37.6364"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00B1BC" />
        <stop offset="1" stop-color="#75D9A3" />
      </linearGradient>
      <clipPath id="clip0_5118_44036">
        <rect
          width="44.7273"
          height="38.7273"
          fill="white"
          transform="translate(1.63672 9.27271)"
        />
      </clipPath>
    </defs>
  </svg>
);
const PLAN_ICONS = {
  basic: BasicSVG,
  plus: PlusSVG,
  pro: ProSVG,
};

const subscriptionData = {
  plan: "Upchar-Q Plus",
  status: "Paid",
  billingCycle: "Half-Yearly",
  monthlyAmount: "₹13,564/- (Inc. Tax)",
  nextBilling: "05/02/2026 (31 Days Remaining)",
  doctorAddons: "-",
  staffAddons: "x1 - @412 (inc. tax)",
};

export default function Payment() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState("halfYearly");
  const [doctors, setDoctors] = useState(1);
  const [staff, setStaff] = useState(3);
  const [paymentMethod, setPaymentMethod] = useState("gpay");
  const [upiId, setUpiId] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const location = useLocation();

  const selectedPlan = location.state?.selectedPlan || "pro";
  const SelectedPlanIcon = PLAN_ICONS[selectedPlan];


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4 md:px-6">
    <div className="px-4 py-3">
                  <img src="/logo.png" alt="logo" className="w-[128px] h-auto" />
                </div>
        <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
          <span className="flex items-center gap-1 bg-success-100 text-success-300 p-1 rounded-lg">
            <span>⏱</span> 15:00
          </span>
          <span className="flex items-center font-semibold gap-1">
            Safe & Secure
            <Shield className="w-4 h-4 bg-success-100 text-success-300" />
          </span>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-4 md:py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column*/}
          <div className="space-y-4 md:space-y-4">
            {/* Plan Card */}
            <div className="bg-card rounded-xl border border-blue-primary400 p-4 md:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center bg-primary/10">
                    {SelectedPlanIcon}
                  </div>

                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Plan Subscription
                    </p>
                    <h2 className="text-lg md:text-xl font-semibold text-blue-primary250">
                      Upchar-Q Pro
                    </h2>
                  </div>
                </div>
                <span className="inline-flex items-center text-success-400 bg-success-100 px-2 py-0.5 rounded-md border border-success-300">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4"
                      stroke="currentColor"
                    />
                  </svg>
                  {subscriptionData.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 md:gap-8 text-sm text-muted-foreground mb-4 md:mb-0">
                <div>
                  <p className="text-xs text-muted-foreground">Due Date</p>
                  <p className="font-medium text-secondary-grey200">02/12/2025</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Invoice Number
                  </p>
                  <p className="font-medium text-secondary-grey200">INV-2025-02</p>
                </div>
              </div>
              {/* Billing Cycle */}
            
            </div>
            <div className="p-2">
                  <div className="mb-4 md:mb-6">
                <p className="text-sm font-medium text-foreground mb-3">
                  Billing Cycle
                </p>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="billing"
                      checked={billingCycle === "monthly"}
                      onChange={() => setBillingCycle("monthly")}
                      className="sr-only peer"
                    />

                    <span
                   className="
    w-4 h-4 rounded-full
    border-2 border-secondary-grey200      
    flex items-center justify-center
    peer-checked:border-blue-primary250
    peer-checked:bg-blue-primary250
    peer-checked:before:content-['']
    peer-checked:before:w-2
    peer-checked:before:h-2
    peer-checked:before:bg-card
    peer-checked:before:rounded-full
  "
                    />

                    <span className="text-sm text-muted-foreground">
                      Monthly
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="billing"
                      checked={billingCycle === "halfYearly"}
                      onChange={() => setBillingCycle("halfYearly")}
                      className="sr-only peer"
                    />

                    <span
                              className="
    w-4 h-4 rounded-full
    border-2 border-secondary-grey200      
    flex items-center justify-center
    peer-checked:border-blue-primary250 
    peer-checked:bg-blue-primary250
    peer-checked:before:content-['']
    peer-checked:before:w-2
    peer-checked:before:h-2
    peer-checked:before:bg-card
    peer-checked:before:rounded-full
  "
                    />
                    <span className="text-sm text-muted-foreground">
                      Half-Yearly
                    </span>
                 <span className="text-xs bg-success-100 p-1 text-success-300">
                      Get 1 Months Free
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="billing"
                      checked={billingCycle === "yearly"}
                      onChange={() => setBillingCycle("yearly")}
                      className="sr-only peer"
                    />

                    <span
                          className="
    w-4 h-4 rounded-full
    border-2 border-secondary-grey200      
    flex items-center justify-center
    peer-checked:border-blue-primary250 
    peer-checked:bg-blue-primary250
    peer-checked:before:content-['']
    peer-checked:before:w-2
    peer-checked:before:h-2
    peer-checked:before:bg-card
    peer-checked:before:rounded-full
  "
                    />

                    <span className="text-sm text-muted-foreground">
                      Yearly
                    </span>
                    <span className="text-xs bg-success-100 p-1 text-success-300">
                      Get 2 Months Free
                    </span>
                  </label>
                </div>
              </div>
              {/*  Count */}
              <div className="flex flex-wrap gap-6 md:gap-8 border-t border-b border-border py-2">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Number of Doctors (Max 2)
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDoctors(Math.max(1, doctors - 1))}
                      className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-muted"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 h-8 flex items-center justify-center border border-border rounded text-sm font-medium">
                      {doctors}
                    </span>
                    <button
                      onClick={() => setDoctors(Math.min(2, doctors + 1))}
                      className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-muted"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="border-l pl-3 border-border">
                  <p className="text-sm text-muted-foreground mb-2">
                    Number of Staffs (Max 4)
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setStaff(Math.max(1, staff - 1))}
                      className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-muted"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 h-8 flex items-center justify-center border border-border rounded text-sm font-medium">
                      {staff}
                    </span>
                    <button
                      onClick={() => setStaff(Math.min(4, staff + 1))}
                      className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-muted"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Payment Summary */}
            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <h3 className="font-semibold text-foreground mb-1">
                Payment Summary
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                for May 24, 2025 - May 24, 2026.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Plus (Base)</span>
                  <span className="text-foreground font-medium">₹2,549/mo</span>
                </div>
                <div className="border-t border-border pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Base x 6Months
                    </span>
                    <span className="text-foreground">₹15,294</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      1 Extra Staff x 6 Months
                    </span>
                    <span className="text-foreground">₹2,394</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Prorated Credit for 1 Month
                    </span>
                    <span className="text-success-300">-₹2,549</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      6-Month Bonus (1 Month Free)
                    </span>
                    <span className="text-success-300">-₹249</span>
                  </div>
                </div>
                <div className="border-t border-border pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Subtotal (For 6 months)
                    </span>
                    <span className="text-foreground">₹14,890</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes</span>
                    <span className="text-foreground">₹2,680</span>
                  </div>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between bg-blue-primary100 p-2 rounded-md">
                    <span className="font-medium text-foreground">
                      Total Amount
                    </span>
                    <span className="text-xl font-bold text-blue-primary250">
                      ₹17,570
                    </span>
                  </div>
                </div>
                <div className="bg-success-100  rounded-lg p-3 text-center">
                  <span className="text-sm  text-success-300 font-medium">
                    🎉 Get 1 Month Free! You save ₹2,713
                  </span>
                </div>
                <div className="flex items-start gap-2 pt-2">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-blue-primary250"
                  />
                  <p className="text-xs text-muted-foreground">
                    I agree to the{" "}
                    <span className="text-primary underline cursor-pointer">
                      Terms and Conditions
                    </span>{" "}
                    and{" "}
                    <span className="text-primary underline cursor-pointer">
                      Privacy Policy
                    </span>
                    . I understand that this subscription will automatically
                    renew unless cancelled.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="space-y-4">
            
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Recommended Method
              </h3>
              <div className="space-y-2">
                <label
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    paymentMethod === "bhim"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <img
                    src="/bhim.png"
                    alt="BHIM"
                    className="w-8 h-8 object-contain"
                  />

                  <span className="text-sm font-medium text-foreground flex-1">
                    BHIM
                  </span>
          
                       <input
                      type="radio"
                    name="payment"
                    checked={paymentMethod === "bhim"}
                    onChange={() => setPaymentMethod("bhim")}
                      className="sr-only peer"
                    />

                    <span
                              className="
    w-4 h-4 rounded-full
    border-2 border-secondary-grey200      
    flex items-center justify-center
    peer-checked:border-blue-primary250 
    peer-checked:bg-blue-primary250
    peer-checked:before:content-['']
    peer-checked:before:w-2
    peer-checked:before:h-2
    peer-checked:before:bg-card
    peer-checked:before:rounded-full
  "
                    />
                    
                </label>
                {paymentMethod === "bhim" && (
  <div className="mt-4">
    <label className="text-sm text-muted-foreground">
      Enter Your BHIM UPI ID *
    </label>
    <input
      type="text"
      value={upiId}
      onChange={(e) => setUpiId(e.target.value)}
      placeholder="Enter UPI ID"
      className="w-full mt-2 px-3 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
    /><button className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-primary250 text-monochrom-white rounded-md">
      <Send className="w-4 h-4" /> Send Payment Request
    </button>
  </div>
)}

                <label
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    paymentMethod === "gpay"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <img
                    src="/gpay.png"
                    alt="GPay"
                    className="w-8 h-8 object-contain"
                  />

                  <span className="text-sm font-medium text-foreground flex-1">
                    Gpay
                  </span>
                            <input
                       type="radio"
                    name="payment"
                    checked={paymentMethod === "gpay"}
                    onChange={() => setPaymentMethod("gpay")}
                      className="sr-only peer"
                    />

                    <span
                               className="
    w-4 h-4 rounded-full
    border-2 border-secondary-grey200      
    flex items-center justify-center
    peer-checked:border-blue-primary250 
    peer-checked:bg-blue-primary250
    peer-checked:before:content-['']
    peer-checked:before:w-2
    peer-checked:before:h-2
    peer-checked:before:bg-card
    peer-checked:before:rounded-full
  "
                    />
                </label>
              </div>
              {paymentMethod === "gpay" && (
                <div className="mt-4">
                  <label className="text-sm text-muted-foreground">
                    Enter Your Gpay UPI ID *
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="Enter UPI ID"
                    className="w-full mt-2 px-3 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-primary250 text-monochrom-white rounded-md">
                    <Send className="w-4 h-4" /> Send Payment Request
                  </button>
                </div>
              )}
            </div>
            {/* UPI Options */}
            <div className="bg-card rounded-xl border border-border p-4 ">
              <div className="space-y-2">
                <label
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    paymentMethod === "phonepe1"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <img
                    src="/phonepay.png"
                    alt="PhonePay"
                    className="w-8 h-8 object-contain"
                  />

                  <span className="text-sm font-medium text-foreground flex-1">
                    PhonePe
                  </span>
                      <input
                      type="radio"
                    name="payment"
                    checked={paymentMethod === "phonepe1"}
                    onChange={() => setPaymentMethod("phonepe1")}
                      className="sr-only peer"
                    />

                    <span
                               className="
    w-4 h-4 rounded-full
    border-2 border-secondary-grey200      
    flex items-center justify-center
    peer-checked:border-blue-primary250 
    peer-checked:bg-blue-primary250
    peer-checked:before:content-['']
    peer-checked:before:w-2
    peer-checked:before:h-2
    peer-checked:before:bg-card
    peer-checked:before:rounded-full
  "
                    />
                  
                </label>
                            {paymentMethod === "phonepe1" && (
  <div className="mt-4">
    <label className="text-sm text-muted-foreground">
      Enter Your PhonePe UPI ID *
    </label>
    <input
      type="text"
      value={upiId}
      onChange={(e) => setUpiId(e.target.value)}
      placeholder="Enter UPI ID"
      className="w-full mt-2 px-3 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
    />
    <button className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-primary250 text-monochrom-white rounded-md">
      <Send className="w-4 h-4" /> Send Payment Request
    </button>
  </div>
)}
                <label
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    paymentMethod === "phonepe2"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <img
                    src="/phonePey.png"
                    alt="Phonepay"
                    className="w-8 h-8 object-contain"
                  />

                  <span className="text-sm font-medium text-foreground flex-1">
                    PhonePe
                  </span>
                  <input
                       type="radio"
                    name="payment"
                    checked={paymentMethod === "phonepe2"}
                    onChange={() => setPaymentMethod("phonepe2")}
                      className="sr-only peer"
                    />

                    <span
                               className="
    w-4 h-4 rounded-full
    border-2 border-secondary-grey200      
    flex items-center justify-center
    peer-checked:border-blue-primary250 
    peer-checked:bg-blue-primary250
    peer-checked:before:content-['']
    peer-checked:before:w-2
    peer-checked:before:h-2
    peer-checked:before:bg-card
    peer-checked:before:rounded-full
  "
                    />
                 
                </label>
                {paymentMethod === "phonepe2" && (
  <div className="mt-4">
    <label className="text-sm text-muted-foreground">
      Enter Your PhonePe UPI ID *
    </label>
    <input
      type="text"
      value={upiId}
      onChange={(e) => setUpiId(e.target.value)}
      placeholder="Enter UPI ID"
      className="w-full mt-2 px-3 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
    />
    <button className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-primary250 text-monochrom-white rounded-md">
      <Send className="w-4 h-4" /> Send Payment Request
    </button>
  </div>
)}

              </div>
            </div>
            {/* Cards Section */}
            <div className="bg-card rounded-xl border border-border p-4 flex flex-col gap-2">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Cards
              </h3>
              <label
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  paymentMethod === "hdfc"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <img
                  src="/visa.png"
                  alt="VISA"
                  className="w-8 h-8 object-contain"
                />

                <span className="text-sm text-foreground flex-1">
                  HDFC Bank | **0964
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter CVV"
                    className="w-20 px-2 py-1 border border-border rounded text-xs bg-background"
                  />
                  <button
                    disabled
                    className="px-3 py-1 text-sm border border-border rounded-md text-foreground bg-background hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Pay Now
                  </button>
                </div>
              </label>
              <button className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors text-blue-primary250">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                    fill="#96BFFF"
                  />
                  <path
                    d="M10 16.5C10.2761 16.5 10.5 16.2761 10.5 16C10.5 15.7239 10.2761 15.5 10 15.5V16V16.5ZM6 15.5C5.72386 15.5 5.5 15.7239 5.5 16C5.5 16.2761 5.72386 16.5 6 16.5V16V15.5ZM14 16.5C14.2761 16.5 14.5 16.2761 14.5 16C14.5 15.7239 14.2761 15.5 14 15.5V16V16.5ZM12.5 15.5C12.2239 15.5 12 15.7239 12 16C12 16.2761 12.2239 16.5 12.5 16.5V16V15.5ZM2 9.5C1.72386 9.5 1.5 9.72386 1.5 10C1.5 10.2761 1.72386 10.5 2 10.5V10V9.5ZM22 10.5C22.2761 10.5 22.5 10.2761 22.5 10C22.5 9.72386 22.2761 9.5 22 9.5V10V10.5ZM10 4V4.5H14V4V3.5H10V4ZM14 20V19.5H10V20V20.5H14V20ZM10 20V19.5C8.10025 19.5 6.72573 19.4989 5.67754 19.358C4.64373 19.219 4.00253 18.9523 3.52513 18.4749L3.17157 18.8284L2.81802 19.182C3.51219 19.8762 4.39959 20.1952 5.54429 20.3491C6.6746 20.5011 8.12852 20.5 10 20.5V20ZM2 12H1.5C1.5 13.8715 1.49894 15.3254 1.65091 16.4557C1.80481 17.6004 2.12385 18.4878 2.81802 19.182L3.17157 18.8284L3.52513 18.4749C3.04772 17.9975 2.78098 17.3563 2.64199 16.3225C2.50106 15.2743 2.5 13.8998 2.5 12H2ZM22 12H21.5C21.5 13.8998 21.4989 15.2743 21.358 16.3225C21.219 17.3563 20.9523 17.9975 20.4749 18.4749L20.8284 18.8284L21.182 19.182C21.8762 18.4878 22.1952 17.6004 22.3491 16.4557C22.5011 15.3254 22.5 13.8715 22.5 12H22ZM14 20V20.5C15.8715 20.5 17.3254 20.5011 18.4557 20.3491C19.6004 20.1952 20.4878 19.8762 21.182 19.182L20.8284 18.8284L20.4749 18.4749C19.9975 18.9523 19.3563 19.219 18.3225 19.358C17.2743 19.4989 15.8998 19.5 14 19.5V20ZM14 4V4.5C15.8998 4.5 17.2743 4.50106 18.3225 4.64199C19.3563 4.78098 19.9975 5.04772 20.4749 5.52513L20.8284 5.17157L21.182 4.81802C20.4878 4.12385 19.6004 3.80481 18.4557 3.65091C17.3254 3.49894 15.8715 3.5 14 3.5V4ZM22 12H22.5C22.5 10.1285 22.5011 8.67461 22.3491 7.54429C22.1952 6.39959 21.8762 5.51219 21.182 4.81802L20.8284 5.17157L20.4749 5.52513C20.9523 6.00253 21.219 6.64373 21.358 7.67754C21.4989 8.72573 21.5 10.1002 21.5 12H22ZM10 4V3.5C8.12852 3.5 6.67461 3.49894 5.54429 3.65091C4.39959 3.80481 3.51219 4.12385 2.81802 4.81802L3.17157 5.17157L3.52513 5.52513C4.00253 5.04772 4.64373 4.78098 5.67754 4.64199C6.72573 4.50106 8.10025 4.5 10 4.5V4ZM2 12H2.5C2.5 10.1002 2.50106 8.72573 2.64199 7.67754C2.78098 6.64373 3.04772 6.00253 3.52513 5.52513L3.17157 5.17157L2.81802 4.81802C2.12385 5.51219 1.80481 6.39959 1.65091 7.54429C1.49894 8.67461 1.5 10.1285 1.5 12H2ZM10 16V15.5H6V16V16.5H10V16ZM14 16V15.5H12.5V16V16.5H14V16ZM2 10V10.5H22V10V9.5H2V10Z"
                    fill="#424242"
                  />
                </svg>
                Add credit or debit cards
                <Plus className="w-4 h-4 ml-auto text-blue-primary250" />
              </button>
            </div>
            {/*UPI App */}
            <div className="bg-card rounded-xl border border-border p-4 ">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">
                Pay by any UPI App
              </h3>
              <label
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  paymentMethod === "amazonPay"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <img
                  src="/apay.png"
                  alt="APay"
                  className="w-8 h-8 object-contain"
                />

                <span className="text-sm text-foreground flex-1">
                  Amazon Pay Balance
                </span>
             
                 <input
                       type="radio"
                    name="payment"
                     checked={paymentMethod === "amazonPay"}
                  onChange={() => setPaymentMethod("amazonPay")}
                      className="sr-only peer"
                    />

                    <span
                               className="
    w-4 h-4 rounded-full
    border-2 border-secondary-grey200      
    flex items-center justify-center
    peer-checked:border-blue-primary250 
    peer-checked:bg-blue-primary250
    peer-checked:before:content-['']
    peer-checked:before:w-2
    peer-checked:before:h-2
    peer-checked:before:bg-card
    peer-checked:before:rounded-full
  "
                    />
                 
              </label>
              {paymentMethod === "amazonPay" && (
  <div className="mt-4">
    <label className="text-sm text-muted-foreground">
      Enter Your Amazon Pay UPI ID *
    </label>
    <input
      type="text"
      value={upiId}
      onChange={(e) => setUpiId(e.target.value)}
      placeholder="Enter UPI ID"
      className="w-full mt-2 px-3 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
    />
    <button className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-primary250 text-monochrom-white rounded-md">
      <Send className="w-4 h-4" /> Send Payment Request
    </button>
  </div>
)}

              <button className="flex items-center w-full gap-2 mt-3 text-sm text-blue-primary250 hover:underline border p-1 border-blue-primary150 border-dotted rounded-md">
                <img
                  src="/upi.png"
                  alt="upi"
                  className="w-8 h-8 object-contain"
                />
                Add New UPI ID
                <Plus className="w-4 h-4 ml-auto text-blue-primary250" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
