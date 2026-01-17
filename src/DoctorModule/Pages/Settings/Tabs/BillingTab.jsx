import React, { useState } from "react";
import { Eye, Download, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InvoiceDrawer from "../Drawers/InvoiceDrawer";
const BasicSVG = (
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48.0001" height="47.9574" rx="6" fill="#0D47A1"/>
<ellipse cx="6.54501" cy="5.99479" rx="1.09091" ry="1.08994" fill="white"/>
<ellipse cx="40.3634" cy="13.0793" rx="1.09091" ry="1.08994" fill="white"/>
<ellipse cx="32.1822" cy="6.53966" rx="0.545456" ry="0.544971" fill="white"/>
<ellipse cx="11.9996" cy="12.5344" rx="0.545456" ry="0.544971" fill="white"/>
<ellipse cx="3.81792" cy="26.1585" rx="0.545456" ry="0.544971" fill="white"/>
<ellipse cx="40.9087" cy="26.1585" rx="0.545456" ry="0.544971" fill="white"/>
<ellipse cx="44.7271" cy="5.99474" rx="0.545456" ry="0.544971" fill="white"/>
<ellipse cx="9.27255" cy="21.7989" rx="1.09091" ry="1.08994" fill="white"/>
<ellipse cx="40.9093" cy="32.6982" rx="1.09091" ry="1.08994" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M26.8268 34.0338L21.25 34.1001C18.3974 29.006 13.1335 25.3403 12.6924 18.8177C12.6924 12.7434 18.1815 8.19391 24.0031 8.19391C29.5427 8.19391 35.3206 12.6422 35.3206 18.4902C35.3206 24.7588 29.6581 28.8525 26.8268 34.0338Z" fill="url(#paint0_linear_5118_49144)"/>
<path d="M21.8861 34.0969H21.502V36.3913H21.8861V34.0969Z" fill="url(#paint1_linear_5118_49144)"/>
<path d="M24.1986 34.0969H23.8145V36.3913H24.1986V34.0969Z" fill="url(#paint2_linear_5118_49144)"/>
<path d="M26.2543 34.0969H25.8701V36.3913H26.2543V34.0969Z" fill="url(#paint3_linear_5118_49144)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.2324 37.8197C11.2254 35.7075 12.6149 34.7402 14.4046 34.9306C16.2033 35.1853 16.9949 36.1364 16.9442 37.6704C16.8907 38.2888 17.163 38.4597 17.7925 38.1396C18.4582 37.673 19.1492 37.4403 19.9002 37.7557C20.69 38.1136 20.4554 39.2018 21.1812 39.2932L21.8856 42.427L10.8841 42.1955L10.2324 37.8197Z" fill="url(#paint4_linear_5118_49144)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M43.4017 47.9998C30.0637 47.9893 16.7258 47.9786 3.38777 47.968C2.85877 46.34 3.69606 45.4706 4.96143 44.8388C1.87812 42.2599 2.99468 37.6382 7.82112 36.9284C9.77162 36.5688 11.5048 37.549 13.1138 39.2934C14.7322 41.5399 16.0732 39.6923 17.5528 39.8918C18.8937 40.002 19.7651 41.0715 20.7112 40.8939L26.6235 39.8385C29.273 38.9784 28.9457 40.9438 30.1227 41.0645C31.332 41.1563 32.2852 39.4681 33.8146 39.2934C34.4354 39.182 34.1597 40.0194 34.7323 40.2224C36.1799 40.5527 36.6031 37.6422 40.2915 38.3351C44.2364 39.2934 46.2649 43.8192 43.4017 47.9998Z" fill="url(#paint5_linear_5118_49144)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.1826 36.3912H26.6245V41.0353C26.6245 41.6735 26.1019 42.1957 25.4631 42.1957H22.3441C21.7053 42.1957 21.1826 41.6735 21.1826 41.0353V36.3912Z" fill="url(#paint6_linear_5118_49144)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.2512 34.0763C21.8863 25.4063 20.5555 13.9641 23.6362 8.19391C12.1379 15.1539 18.6683 25.8661 22.4198 34.0763H23.2512Z" fill="url(#paint7_linear_5118_49144)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.8742 34.0568C26.2391 25.3868 27.5699 13.9446 24.4893 8.17444C35.6249 15.2332 29.1934 25.9184 25.7056 34.0568H24.8742Z" fill="url(#paint8_linear_5118_49144)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.8857 34.0568L23.2516 34.0761C21.3656 22.2517 21.0844 12.9801 23.6262 8.2001L24.4899 8.17444C28.1004 14.2645 25.7807 27.5429 24.8857 34.0568Z" fill="url(#paint9_radial_5118_49144)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.2445 28.9439L20.3927 28.9119C20.3927 28.1319 19.924 28.1088 20.0737 27.6273C20.2916 27.1679 20.1725 26.7803 19.8443 26.6677C19.3517 26.5317 18.7432 26.6197 18.0517 26.8674C17.762 26.9357 17.7228 26.8765 17.6968 26.6009C17.5772 25.8232 16.8429 25.3639 16.1363 25.535C13.5584 26.0235 12.6938 27.7482 13.2445 28.9439Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M28.9834 30.7801H41.8113C42.5786 30.749 42.8974 30.0238 42.7824 28.628C41.9714 25.9912 40.7305 25.021 39.2077 25.1418C38.1152 25.2288 37.2915 26.0142 36.6254 27.2101C35.9284 28.3309 35.1055 28.5892 34.1807 28.1464C33.1121 27.3676 32.0109 27.5008 30.885 28.3146L28.9834 30.7801Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear_5118_49144" x1="12.4414" y1="58.9619" x2="34.7468" y2="58.9619" gradientUnits="userSpaceOnUse">
<stop stop-color="#00B1BC"/>
<stop offset="1" stop-color="#75D9A3"/>
</linearGradient>
<linearGradient id="paint1_linear_5118_49144" x1="21.4977" y1="38.5931" x2="21.8764" y2="38.5931" gradientUnits="userSpaceOnUse">
<stop offset="0.680208" stop-color="#00B1BC"/>
<stop offset="1" stop-color="#75D9A3"/>
</linearGradient>
<linearGradient id="paint2_linear_5118_49144" x1="23.8102" y1="38.5931" x2="24.1889" y2="38.5931" gradientUnits="userSpaceOnUse">
<stop offset="0.680208" stop-color="#00B1BC"/>
<stop offset="1" stop-color="#75D9A3"/>
</linearGradient>
<linearGradient id="paint3_linear_5118_49144" x1="25.8659" y1="38.5931" x2="26.2446" y2="38.5931" gradientUnits="userSpaceOnUse">
<stop offset="0.680208" stop-color="#00B1BC"/>
<stop offset="1" stop-color="#75D9A3"/>
</linearGradient>
<linearGradient id="paint4_linear_5118_49144" x1="10.1031" y1="49.6437" x2="21.5901" y2="49.6437" gradientUnits="userSpaceOnUse">
<stop stop-color="#00B1BC"/>
<stop offset="1" stop-color="#AFFFD4"/>
</linearGradient>
<linearGradient id="paint5_linear_5118_49144" x1="2.76597" y1="58.6958" x2="43.6926" y2="58.6958" gradientUnits="userSpaceOnUse">
<stop stop-color="#81F3FB"/>
<stop offset="1" stop-color="#75D9A3"/>
</linearGradient>
<linearGradient id="paint6_linear_5118_49144" x1="21.1222" y1="47.7662" x2="26.4865" y2="47.7662" gradientUnits="userSpaceOnUse">
<stop stop-color="#00B1BC"/>
<stop offset="1" stop-color="#75D9A3"/>
</linearGradient>
<linearGradient id="paint7_linear_5118_49144" x1="17.0755" y1="58.9152" x2="23.4716" y2="58.9152" gradientUnits="userSpaceOnUse">
<stop offset="0.232292" stop-color="#54CEAB"/>
<stop offset="1" stop-color="#05A5AF"/>
</linearGradient>
<linearGradient id="paint8_linear_5118_49144" x1="24.4199" y1="58.8957" x2="30.5847" y2="58.8957" gradientUnits="userSpaceOnUse">
<stop offset="0.232292" stop-color="#10B6B9"/>
<stop offset="1" stop-color="#75D9A4"/>
</linearGradient>
<radialGradient id="paint9_radial_5118_49144" cx="0" cy="0" r="1" gradientTransform="matrix(2.30113 1.62098e-05 -3.00876e-06 1322.31 24.0277 58.9336)" gradientUnits="userSpaceOnUse">
<stop stop-color="#00B1BC"/>
<stop offset="1" stop-color="#75D9A3"/>
</radialGradient>
</defs>
</svg>


);

const PlusSVG = (
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="48" rx="6" fill="#0D47A1"/>
<circle cx="6.54501" cy="6.00003" r="1.09091" fill="white"/>
<circle cx="40.3634" cy="13.0909" r="1.09091" fill="white"/>
<circle cx="32.1822" cy="6.54545" r="0.545455" fill="white"/>
<circle cx="11.9996" cy="12.5455" r="0.545455" fill="white"/>
<circle cx="3.81792" cy="26.1818" r="0.545455" fill="white"/>
<circle cx="40.9087" cy="26.1818" r="0.545455" fill="white"/>
<circle cx="44.7271" cy="5.99998" r="0.545455" fill="white"/>
<circle cx="9.27255" cy="21.8182" r="1.09091" fill="white"/>
<circle cx="40.9093" cy="32.7273" r="1.09091" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.095 44.3126V10.3635C22.5718 10.594 21.2004 12.2639 20.0823 16.344V35.7482C19.8394 36.6732 23.3653 44.6793 24.095 44.3126Z" fill="url(#paint0_linear_5118_49047)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.13899 29.9188C5.15786 30.1851 5.24911 30.3844 5.5416 30.3974L20.0824 28.7679V21.5651L4.98047 28.0535L5.13899 29.9188Z" fill="url(#paint1_linear_5118_49047)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.0026 24.0262C10.3704 24.0262 10.6713 24.3271 10.6713 24.6949V26.7312H9.33398V24.6949C9.33398 24.3271 9.6349 24.0262 10.0026 24.0262Z" fill="url(#paint2_linear_5118_49047)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.8659 21.8844C15.2337 21.8844 15.5345 22.1852 15.5345 22.553V24.5893H14.1973V22.553C14.1973 22.1852 14.4981 21.8844 14.8659 21.8844Z" fill="url(#paint3_linear_5118_49047)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.6185 40.2823L17.8506 42.7548L18.1392 45.3913C18.1392 45.3913 18.1621 46.0752 18.656 45.9536C19.1498 45.832 23.5134 43.851 23.5134 43.851L21.6185 40.2823Z" fill="url(#paint4_linear_5118_49047)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.727 32.0498L16.9399 39.8906C16.9434 40.4104 16.7139 40.626 16.1806 40.4453C14.9379 39.9477 14.2755 39.1827 14.0456 38.2192C13.8203 37.4137 14.8941 36.6694 15.0106 35.6664C15.1296 34.6559 14.3748 34.3369 15.3675 32.6349C15.9259 31.8968 15.7176 31.618 16.249 31.594C16.5034 31.5774 16.6751 31.707 16.727 32.0498Z" fill="url(#paint5_linear_5118_49047)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.5412 33.7009V47.9603C10.3622 47.9999 8.99858 47.9603 6.46094 47.9603C6.46094 44.9668 9.51635 44.8602 9.86438 43.4013C9.93539 42.2793 9.2032 41.4024 9.18293 40.174C9.16266 38.9532 10.3275 38.7583 10.5809 37.8112C10.7759 37.1755 9.83131 36.4713 10.4595 35.3114C10.6849 34.7895 11.3205 34.5414 11.546 33.8145C11.8778 33.2097 12.2094 33.2117 12.5412 33.7009Z" fill="url(#paint6_linear_5118_49047)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.083 44.3126V10.3635C25.6062 10.594 26.9776 12.2639 28.0957 16.344V35.7482C28.3386 36.6732 24.8127 44.6793 24.083 44.3126Z" fill="url(#paint7_linear_5118_49047)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M43.0401 29.9188C43.0212 30.1851 42.93 30.3844 42.6375 30.3974L28.0967 28.7679V21.5651L43.1986 28.0535L43.0401 29.9188Z" fill="url(#paint8_linear_5118_49047)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M38.1764 24.0262C37.8087 24.0262 37.5078 24.3271 37.5078 24.6949V26.7312H38.8451V24.6949C38.8451 24.3271 38.5442 24.0262 38.1764 24.0262Z" fill="url(#paint9_linear_5118_49047)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M33.3142 21.8844C32.9464 21.8844 32.6455 22.1852 32.6455 22.553V24.5893H33.9828V22.553C33.9828 22.1852 33.6819 21.8844 33.3142 21.8844Z" fill="url(#paint10_linear_5118_49047)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M26.5599 40.2823L30.3278 42.7548L30.0392 45.3913C30.0392 45.3913 30.0163 46.0752 29.5224 45.9536C29.0285 45.832 24.665 43.851 24.665 43.851L26.5599 40.2823Z" fill="url(#paint11_linear_5118_49047)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M31.4523 32.0498L31.2393 39.8906C31.2358 40.4104 31.4653 40.626 31.9986 40.4453C33.2414 39.9477 33.9037 39.1827 34.1336 38.2192C34.359 37.4137 33.2851 36.6694 33.1686 35.6664C33.0496 34.6559 33.8044 34.3369 32.8117 32.6349C32.2533 31.8968 32.4616 31.618 31.9303 31.594C31.6758 31.5774 31.5041 31.707 31.4523 32.0498Z" fill="url(#paint12_linear_5118_49047)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M35.6366 33.7009L35.4531 47.9603C37.9077 47.9603 39.2713 47.9603 41.7169 47.9603C41.7169 44.9668 38.6615 44.8602 38.3134 43.4013C38.2425 42.2793 38.9746 41.4024 38.9949 40.174C39.0152 38.9532 37.8503 38.7583 37.597 37.8112C37.4019 37.1755 38.3465 36.4713 37.7184 35.3114C37.4929 34.7895 36.8573 34.5414 36.6318 33.8145C36.3001 33.2097 35.9684 33.2117 35.6366 33.7009Z" fill="url(#paint13_linear_5118_49047)"/>
<defs>
<linearGradient id="paint0_linear_5118_49047" x1="20.0257" y1="76.917" x2="23.9929" y2="76.917" gradientUnits="userSpaceOnUse">
<stop stop-color="#75D9A3"/>
<stop offset="0.805208" stop-color="#00B1BC"/>
</linearGradient>
<linearGradient id="paint1_linear_5118_49047" x1="4.81294" y1="38.8736" x2="19.6995" y2="38.8736" gradientUnits="userSpaceOnUse">
<stop stop-color="#75D9A3"/>
<stop offset="1" stop-color="#00B1BC"/>
</linearGradient>
<linearGradient id="paint2_linear_5118_49047" x1="9.31915" y1="29.327" x2="10.6374" y2="29.327" gradientUnits="userSpaceOnUse">
<stop stop-color="#00B1BC"/>
<stop offset="1" stop-color="#75D9A3"/>
</linearGradient>
<linearGradient id="paint3_linear_5118_49047" x1="14.1824" y1="27.1851" x2="15.5006" y2="27.1851" gradientUnits="userSpaceOnUse">
<stop stop-color="#00B1BC"/>
<stop offset="1" stop-color="#75D9A3"/>
</linearGradient>
<linearGradient id="paint4_linear_5118_49047" x1="17.7878" y1="51.4246" x2="23.3698" y2="51.4246" gradientUnits="userSpaceOnUse">
<stop stop-color="#75D9A3"/>
<stop offset="0.83125" stop-color="#00B1BC"/>
</linearGradient>
<linearGradient id="paint5_linear_5118_49047" x1="13.9822" y1="49.0645" x2="16.8658" y2="49.0645" gradientUnits="userSpaceOnUse">
<stop stop-color="#B6E8EB"/>
<stop offset="1" stop-color="#75D9A3"/>
</linearGradient>
<linearGradient id="paint6_linear_5118_49047" x1="6.39315" y1="68.5278" x2="12.4168" y2="68.5278" gradientUnits="userSpaceOnUse">
<stop stop-color="#B6E8EB"/>
<stop offset="1" stop-color="#75D9A3"/>
</linearGradient>
<linearGradient id="paint7_linear_5118_49047" x1="24.0384" y1="76.917" x2="28.0056" y2="76.917" gradientUnits="userSpaceOnUse">
<stop stop-color="#00B1BC"/>
<stop offset="1" stop-color="#75D9A3"/>
</linearGradient>
<linearGradient id="paint8_linear_5118_49047" x1="27.9291" y1="38.8736" x2="42.8157" y2="38.8736" gradientUnits="userSpaceOnUse">
<stop stop-color="#00B1BC"/>
<stop offset="1" stop-color="#75D9A3"/>
</linearGradient>
<linearGradient id="paint9_linear_5118_49047" x1="37.493" y1="29.327" x2="38.8112" y2="29.327" gradientUnits="userSpaceOnUse">
<stop stop-color="#00B1BC"/>
<stop offset="1" stop-color="#75D9A3"/>
</linearGradient>
<linearGradient id="paint10_linear_5118_49047" x1="32.6307" y1="27.1851" x2="33.9489" y2="27.1851" gradientUnits="userSpaceOnUse">
<stop stop-color="#00B1BC"/>
<stop offset="1" stop-color="#75D9A3"/>
</linearGradient>
<linearGradient id="paint11_linear_5118_49047" x1="24.6022" y1="51.4246" x2="30.1842" y2="51.4246" gradientUnits="userSpaceOnUse">
<stop stop-color="#00B1BC"/>
<stop offset="1" stop-color="#75D9A3"/>
</linearGradient>
<linearGradient id="paint12_linear_5118_49047" x1="31.2068" y1="49.0645" x2="34.0904" y2="49.0645" gradientUnits="userSpaceOnUse">
<stop stop-color="#00B1BC"/>
<stop offset="1" stop-color="#D8FFEA"/>
</linearGradient>
<linearGradient id="paint13_linear_5118_49047" x1="35.5382" y1="68.5278" x2="41.5619" y2="68.5278" gradientUnits="userSpaceOnUse">
<stop stop-color="#00B1BC"/>
<stop offset="1" stop-color="#D8FFEA"/>
</linearGradient>
</defs>
</svg>

);

const ProSVG = (
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="48" rx="6" fill="#0D47A1"/>
<circle cx="6.54501" cy="6.00003" r="1.09091" fill="white"/>
<circle cx="40.3634" cy="13.0909" r="1.09091" fill="white"/>
<circle cx="32.1822" cy="6.54545" r="0.545455" fill="white"/>
<circle cx="11.9996" cy="12.5455" r="0.545455" fill="white"/>
<circle cx="3.81792" cy="26.1818" r="0.545455" fill="white"/>
<circle cx="40.9087" cy="26.1818" r="0.545455" fill="white"/>
<circle cx="44.7271" cy="5.99998" r="0.545455" fill="white"/>
<circle cx="9.27255" cy="21.8182" r="1.09091" fill="white"/>
<circle cx="40.9093" cy="32.7273" r="1.09091" fill="white"/>
<g clip-path="url(#clip0_5118_44036)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.1897 9.27277C22.5413 10.381 21.3566 11.6125 20.8096 13.0135H27.4173C26.6983 11.5128 25.5628 10.3081 24.1897 9.27277Z" fill="url(#paint0_linear_5118_44036)"/>
<path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M27.9397 36.6399C29.0912 36.7671 29.7094 37.8633 29.7595 39.993C30.3288 39.9084 30.7301 40.1766 30.921 40.8862C31.6688 40.4696 32.4015 40.5562 33.1151 41.2617C34.335 39.2694 35.9001 38.5198 37.8774 39.2549C39.3019 36.8336 41.3484 36.3296 44.1495 38.1546C46.9672 40.6045 47.2563 44.6241 44.0857 47.6956C43.8691 47.8518 43.627 47.959 43.3501 47.9999H5.16281C4.4604 47.9246 3.88118 47.6849 3.41982 47.2871C0.2409 43.4143 1.62836 38.7741 5.09734 37.2924C7.47261 36.4466 8.99913 37.3619 10.0666 39.2092C12.3128 38.6279 13.8517 39.3722 14.79 41.2418C15.5039 40.5833 16.2271 40.4803 16.9582 40.8406C17.3134 40.2435 17.7088 39.9574 18.1326 39.8955C18.1568 38.0385 18.7963 37.0281 19.8876 36.6399L19.9134 25.3892H28.1862L27.9397 36.6399H27.9397Z" fill="url(#paint1_linear_5118_44036)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.5985 30.3082L20.8096 26.1978C20.2521 24.7088 19.6948 23.22 19.1373 21.7311C16.5803 24.5898 15.75 27.4926 17.5985 30.3082Z" fill="url(#paint2_linear_5118_44036)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.1267 30.4645L24.1135 13.0135L20.809 13.0136C18.6831 16.2306 18.4974 20.689 19.9138 25.3892C20.4188 27.065 21.1309 28.7714 22.0372 30.4627L24.1267 30.4645Z" fill="url(#paint3_linear_5118_44036)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M30.6427 30.3082L27.4316 26.1978C27.9891 24.7088 28.5464 23.22 29.1039 21.7311C31.6609 24.5898 32.4912 27.4926 30.6427 30.3082Z" fill="url(#paint4_linear_5118_44036)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.1263 30.4645L24.1133 13.0117H27.4169C30.3008 17.3756 29.6642 24.0272 26.2157 30.4627L24.1263 30.4645Z" fill="url(#paint5_linear_5118_44036)"/>
<path d="M24.1382 19.8086C25.2145 19.8086 26.087 18.9334 26.087 17.8537C26.087 16.7741 25.2145 15.8989 24.1382 15.8989C23.0619 15.8989 22.1895 16.7741 22.1895 17.8537C22.1895 18.9334 23.0619 19.8086 24.1382 19.8086Z" fill="url(#paint6_linear_5118_44036)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.5795 36.0418L22.5367 38.9264C22.0805 39.189 21.7949 39.574 21.8205 40.1821C20.2047 40.3508 19.4293 41.5906 19.4654 43.8651C18.885 43.7329 18.3121 43.9411 17.7489 44.6031C17.0808 43.7353 16.0346 43.5309 14.6782 43.8716C14.2651 42.6208 13.3023 41.9896 11.7877 41.9814C9.7283 42.2264 8.73654 43.2982 8.63867 45.0622C8.63867 46.7556 10.0103 47.766 12.0329 47.8845H35.2633C37.8029 48.0251 39.7158 47.2996 39.7158 45.1788C39.4728 43.103 38.3626 42.0366 36.399 41.9632C35.1203 41.9652 34.245 42.6866 33.5856 43.7936C32.3744 43.4251 31.3554 43.7304 30.4882 44.5703C30.0878 43.9671 29.5246 43.7063 28.7459 43.8971C28.9337 41.6503 28.2873 40.314 26.5134 40.2077C26.4278 39.6419 26.1947 39.2847 25.8165 39.1332L25.8158 36.0971L22.5795 36.0418L22.5795 36.0418Z" fill="url(#paint7_linear_5118_44036)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.204 37.8034C26.5635 36.0206 27.1601 33.6265 26.2159 30.4626H23.0812H22.037C20.9468 32.9448 21.9722 36.2148 24.204 37.8034Z" fill="url(#paint8_linear_5118_44036)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.227 34.2802C25.3657 32.9859 25.4858 31.6777 25.2608 30.4586C24.5123 30.4584 23.8301 30.4629 23.0816 30.4627C22.7288 31.7176 23.1693 32.9865 24.227 34.2802Z" fill="white" fill-opacity="0.73"/>
</g>
<defs>
<linearGradient id="paint0_linear_5118_44036" x1="24.5463" y1="12.8182" x2="24.5463" y2="9.81822" gradientUnits="userSpaceOnUse">
<stop stop-color="#00B1BC"/>
<stop offset="1" stop-color="#75D9A3"/>
</linearGradient>
<linearGradient id="paint1_linear_5118_44036" x1="1.14054" y1="69.699" x2="45.2299" y2="69.699" gradientUnits="userSpaceOnUse">
<stop stop-color="#00B1BC"/>
<stop offset="1" stop-color="#75D9A3"/>
</linearGradient>
<linearGradient id="paint2_linear_5118_44036" x1="16.5519" y1="38.5396" x2="20.7028" y2="38.5396" gradientUnits="userSpaceOnUse">
<stop stop-color="#00B1BC"/>
<stop offset="1" stop-color="#75D9A3"/>
</linearGradient>
<linearGradient id="paint3_linear_5118_44036" x1="17.4553" y1="21.8183" x2="25.6372" y2="30.5456" gradientUnits="userSpaceOnUse">
<stop stop-color="#00B1BC"/>
<stop offset="1" stop-color="#75D9A3"/>
</linearGradient>
<linearGradient id="paint4_linear_5118_44036" x1="27.3849" y1="38.5396" x2="31.5358" y2="38.5396" gradientUnits="userSpaceOnUse">
<stop stop-color="#00B1BC"/>
<stop offset="1" stop-color="#75D9A3"/>
</linearGradient>
<linearGradient id="paint5_linear_5118_44036" x1="24.0004" y1="20.4547" x2="28.364" y2="21.0001" gradientUnits="userSpaceOnUse">
<stop offset="0.254909" stop-color="#00B1BC"/>
<stop offset="1" stop-color="#75D9A3"/>
</linearGradient>
<linearGradient id="paint6_linear_5118_44036" x1="24.1382" y1="15.8989" x2="26.1821" y2="19.3636" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="#82DEAD"/>
</linearGradient>
<linearGradient id="paint7_linear_5118_44036" x1="24.0009" y1="49.6364" x2="24.0009" y2="36.8182" gradientUnits="userSpaceOnUse">
<stop stop-color="#00B1BC"/>
<stop offset="0.520897" stop-color="#82DEAC"/>
</linearGradient>
<linearGradient id="paint8_linear_5118_44036" x1="24.2732" y1="30.2727" x2="24.2732" y2="37.6364" gradientUnits="userSpaceOnUse">
<stop stop-color="#00B1BC"/>
<stop offset="1" stop-color="#75D9A3"/>
</linearGradient>
<clipPath id="clip0_5118_44036">
<rect width="44.7273" height="38.7273" fill="white" transform="translate(1.63672 9.27271)"/>
</clipPath>
</defs>
</svg>

);

const subscriptionData = {
  plan: "Upchar-Q Plus",
  status: "Active",
  billingCycle: "Half-Yearly",
  monthlyAmount: "₹13,564/- (Inc. Tax)",
  nextBilling: "05/02/2026 (31 Days Remaining)",
  doctorAddons: "-",
  staffAddons: "x1 - @412 (inc. tax)"
};

const invoices = [
  {
    id: "INV-2025-02",
    dueDate: "02/12/2025",
    plan: "Plus (Half Yearly)",
    status: "Pending",
    seats: "1 Doctor | 2 Staff",
    amount: "₹13,564",
  },
  {
    id: "INV-2025-01",
    dueDate: "02/02/2025",
    plan: "Plus (Half Yearly)",
    status: "Paid",
    seats: "1 Doctor | 2 Staff",
    amount: "₹13,564",
  },
  {
    id: "INV-2024-02",
    dueDate: "02/12/2024",
    plan: "Plus (Half Yearly)",
    status: "Paid",
    seats: "1 Doctor | 2 Staff",
    amount: "₹13,564",
  },
  {
    id: "INV-2024-01",
    dueDate: "02/02/2024",
    plan: "Plus (Half Yearly)",
    status: "Paid",
    seats: "1 Doctor | 2 Staff",
    amount: "₹13,564",
  },
];

export default function BillingTab() {
    const planIcons = {
  Basic: BasicSVG,
  Plus: PlusSVG,
  Pro: ProSVG,
};

  const [invoiceDrawerOpen, setInvoiceDrawerOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

 const handleViewInvoice = (invoice) => {
  setSelectedInvoice(invoice);
  setInvoiceDrawerOpen(true);
};

const navigate=useNavigate()
  return (<>
    <div className=" space-y-6 p-4">
      {/* Current Subscription */}
      <div className="rounded-xl border border-[#0E4395] p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
 {planIcons[subscriptionData.plan.split(" ")[1]]}



            <div>
              <p className="text-sm text-gray-500">Current Subscription</p>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">
                  {subscriptionData.plan}
                </h2>
          <span className="inline-flex items-center text-green-500 bg-green-100 px-2 py-0.5 rounded-md border border-green-400 text-xs font-medium">
  <svg
    className="w-4 h-4 mr-1"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
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
            </div>
          </div>

          <a href="/billing/upgrade-plan">
            <button className="border px-2 bg-[#F2F7FF] text-sm py-2 rounded flex items-center gap-2 text-[#2372ec]">
              <ArrowUp size={16} />
              Upgrade Plan
            </button>
          </a>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 border-t pt-4">
          <Info label="Billing Cycle" value={subscriptionData.billingCycle} />
          <Info label="Monthly Amount" value={subscriptionData.monthlyAmount} />
          <Info label="Next Billing" value={subscriptionData.nextBilling} />
          <Info label="Active Add-ons of Doctor" value={subscriptionData.doctorAddons} />
          <Info label="Active Add-ons of Staff" value={subscriptionData.staffAddons} />
        </div>
      </div>

      {/* Invoices */}
      <h3 className="font-semibold px-1">Invoices</h3>
      <div className="rounded-xl border">
      

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-100 text-xs text-gray-500">
              <tr>
                <th className="text-left p-2">Invoice Number</th>
                <th className="text-left p-2">Due Date</th>
                <th className="text-left p-2">Plan</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Seats</th>
                <th className="text-left p-2">Amount</th>
                <th className="text-left"></th>
                <th className="text-left p-2 px-0">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-t hover:bg-gray-50 text-sm"
                >
                  <td className="p-2 font-normal">{invoice.id}</td>
                  <td className="p-2 text-gray-500">{invoice.dueDate}</td>
                  <td className="p-2 text-gray-500">{invoice.plan}</td>
                  <td className="p-2">
                   <span
  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
    invoice.status === "Paid"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600"
  }`}
>
  {invoice.status === "Paid" ? (
    <span className="flex items-center justify-center w-4 h-4 rounded-lg border-2 border-green-600 text-[10px]">
      ✓
    </span>
  ) : (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3.1875 10.7049L2.78074 10.9957H2.78074L3.1875 10.7049ZM2.97115 10.4023L3.37791 10.1115H3.37791L2.97115 10.4023ZM9.02885 10.4023L9.43561 10.693H9.43561L9.02885 10.4023ZM8.8125 10.7049L9.21926 10.9957V10.9957L8.8125 10.7049ZM9.72115 10.4023L10.1279 10.1115L10.1279 10.1115L9.72115 10.4023ZM2.27885 10.4023L2.68561 10.693V10.693L2.27885 10.4023ZM9.13073 1.00599L9.08503 1.5039H9.08503L9.13073 1.00599ZM10.4943 2.43661L10.9926 2.39506V2.39506L10.4943 2.43661ZM2.86927 1.00599L2.82356 0.508082V0.508082L2.86927 1.00599ZM1.50571 2.43661L1.00744 2.39506V2.39506L1.50571 2.43661ZM3.75 7.25C3.47386 7.25 3.25 7.47386 3.25 7.75C3.25 8.02614 3.47386 8.25 3.75 8.25V7.75V7.25ZM8.25 8.25C8.52614 8.25 8.75 8.02614 8.75 7.75C8.75 7.47386 8.52614 7.25 8.25 7.25V7.75V8.25ZM7.35356 4.35357C7.54882 4.15831 7.54882 3.84172 7.35356 3.64646C7.1583 3.4512 6.84172 3.4512 6.64646 3.64646L7.00001 4.00002L7.35356 4.35357ZM4.64646 5.64645C4.4512 5.84172 4.4512 6.1583 4.64646 6.35356C4.84173 6.54882 5.15831 6.54882 5.35357 6.35356L5.00002 6.00001L4.64646 5.64645ZM5.35356 3.64645C5.1583 3.45119 4.84172 3.45119 4.64646 3.64645C4.45119 3.84172 4.45119 4.1583 4.64646 4.35356L5.00001 4.00001L5.35356 3.64645ZM6.64645 6.35355C6.84171 6.54882 7.15829 6.54882 7.35355 6.35355C7.54882 6.15829 7.54882 5.84171 7.35355 5.64645L7 6L6.64645 6.35355ZM3.16667 1V1.5H8.83333V1V0.5H3.16667V1ZM10.5 2.74863H10V10.1299H10.5H11V2.74863H10.5ZM1.5 10.1299H2V2.74863H1.5H1V10.1299H1.5ZM3.1875 10.7049L3.59426 10.4141L3.37791 10.1115L2.97115 10.4023L2.56439 10.693L2.78074 10.9957L3.1875 10.7049ZM9.02885 10.4023L8.62209 10.1115L8.40574 10.4141L8.8125 10.7049L9.21926 10.9957L9.43561 10.693L9.02885 10.4023ZM9.72115 10.4023L10.1279 10.1115C9.75541 9.59041 8.99459 9.59041 8.62209 10.1115L9.02885 10.4023L9.43561 10.693C9.42632 10.706 9.40321 10.7207 9.375 10.7207C9.34679 10.7207 9.32368 10.706 9.3144 10.693L9.72115 10.4023ZM7.6875 10.7049L8.09426 10.4141C7.61359 9.74173 6.63641 9.74173 6.15574 10.4141L6.5625 10.7049L6.96926 10.9957C7.01406 10.933 7.07208 10.9098 7.125 10.9098C7.17792 10.9098 7.23594 10.933 7.28074 10.9957L7.6875 10.7049ZM5.4375 10.7049L5.84426 10.4141C5.36359 9.74173 4.38641 9.74173 3.90574 10.4141L4.3125 10.7049L4.71926 10.9957C4.76406 10.933 4.82208 10.9098 4.875 10.9098C4.92792 10.9098 4.98594 10.933 5.03074 10.9957L5.4375 10.7049ZM2.97115 10.4023L3.37791 10.1115C3.00541 9.59041 2.24459 9.59041 1.87209 10.1115L2.27885 10.4023L2.68561 10.693C2.67632 10.706 2.65321 10.7207 2.625 10.7207C2.59679 10.7207 2.57368 10.706 2.56439 10.693L2.97115 10.4023ZM3.1875 10.7049L2.78074 10.9957C3.26141 11.6681 4.23859 11.6681 4.71926 10.9957L4.3125 10.7049L3.90574 10.4141C3.86094 10.4768 3.80292 10.5 3.75 10.5C3.69708 10.5 3.63906 10.4768 3.59426 10.4141L3.1875 10.7049ZM7.6875 10.7049L7.28074 10.9957C7.76141 11.6681 8.73859 11.6681 9.21926 10.9957L8.8125 10.7049L8.40574 10.4141C8.36094 10.4768 8.30292 10.5 8.25 10.5C8.19708 10.5 8.13906 10.4768 8.09426 10.4141L7.6875 10.7049ZM5.4375 10.7049L5.03074 10.9957C5.51141 11.6681 6.48859 11.6681 6.96926 10.9957L6.5625 10.7049L6.15574 10.4141C6.11094 10.4768 6.05292 10.5 6 10.5C5.94708 10.5 5.88906 10.4768 5.84426 10.4141L5.4375 10.7049ZM1.5 10.1299H1C1 10.5717 1.27746 10.909 1.6308 11.0325C1.98736 11.1572 2.42169 11.0622 2.68561 10.693L2.27885 10.4023L1.87209 10.1115C1.87161 10.1122 1.87462 10.1079 1.88247 10.1023C1.89026 10.0967 1.9 10.0918 1.91085 10.0886C1.93236 10.0823 1.94992 10.0847 1.96092 10.0886C1.9719 10.0924 1.98227 10.0996 1.99032 10.1106C2.00015 10.124 2 10.1342 2 10.1299H1.5ZM10.5 10.1299H10C10 10.1342 9.99985 10.124 10.0097 10.1106C10.0177 10.0996 10.0281 10.0924 10.0391 10.0886C10.0501 10.0847 10.0676 10.0823 10.0892 10.0886C10.1 10.0918 10.1097 10.0967 10.1175 10.1023C10.1254 10.1079 10.1284 10.1122 10.1279 10.1115L9.72115 10.4023L9.31439 10.693C9.57831 11.0622 10.0126 11.1572 10.3692 11.0325C10.7225 10.909 11 10.5717 11 10.1299H10.5ZM8.83333 1V1.5C8.99919 1.5 9.04834 1.50053 9.08503 1.5039L9.13073 1.00599L9.17644 0.508082C9.08264 0.499472 8.97702 0.5 8.83333 0.5V1ZM10.5 2.74863H11C11 2.59633 11.0004 2.48948 10.9926 2.39506L10.4943 2.43661L9.99602 2.47816C9.99956 2.52064 10 2.57617 10 2.74863H10.5ZM9.13073 1.00599L9.08503 1.5039C9.55163 1.54673 9.95129 1.9417 9.99602 2.47816L10.4943 2.43661L10.9926 2.39506C10.9104 1.40985 10.1602 0.598381 9.17644 0.508082L9.13073 1.00599ZM3.16667 1V0.5C3.02298 0.5 2.91736 0.499472 2.82356 0.508082L2.86927 1.00599L2.91497 1.5039C2.95166 1.50053 3.00081 1.5 3.16667 1.5V1ZM1.5 2.74863H2C2 2.57617 2.00044 2.52064 2.00398 2.47816L1.50571 2.43661L1.00744 2.39506C0.999564 2.48948 1 2.59633 1 2.74863H1.5ZM2.86927 1.00599L2.82356 0.508082C1.83982 0.598381 1.08959 1.40985 1.00744 2.39506L1.50571 2.43661L2.00398 2.47816C2.04871 1.9417 2.44837 1.54673 2.91497 1.5039L2.86927 1.00599ZM3.75 7.75V8.25H8.25V7.75V7.25H3.75V7.75ZM7.00001 4.00002L6.64646 3.64646L5.64646 4.64646L6.00001 5.00001L6.35357 5.35357L7.35356 4.35357L7.00001 4.00002ZM6.00001 5.00001L5.64646 4.64646L4.64646 5.64645L5.00002 6.00001L5.35357 6.35356L6.35357 5.35357L6.00001 5.00001ZM5.00001 4.00001L4.64646 4.35356L5.64646 5.35357L6.00001 5.00001L6.35357 4.64646L5.35356 3.64645L5.00001 4.00001ZM6.00001 5.00001L5.64646 5.35357L6.64645 6.35355L7 6L7.35355 5.64645L6.35357 4.64646L6.00001 5.00001Z" fill="#F04248"/> </svg>
  )}
  {invoice.status}
</span>

                  </td>
                  <td className="p-2 text-gray-500">{invoice.seats}</td>
                  <td className="p-2 font-medium">{invoice.amount}</td>
                  <td >   {invoice.status === "Pending" && (
                        <button
            onClick={() =>
  navigate("/billing/payment", {
    state: {
      selectedPlan: subscriptionData.plan.split(" ")[1].toLowerCase(), // "Plus"
    },
  })
}

                        className="text-xs px-2 py-1 bg-[#2372EC] text-white rounded flex items-center justify-center gap-1">
                            <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.83333 9C6.10948 9 6.33333 8.77614 6.33333 8.5C6.33333 8.22386 6.10948 8 5.83333 8V8.5V9ZM3.16667 8C2.89052 8 2.66667 8.22386 2.66667 8.5C2.66667 8.77614 2.89052 9 3.16667 9V8.5V8ZM8.5 9C8.77614 9 9 8.77614 9 8.5C9 8.22386 8.77614 8 8.5 8V8.5V9ZM7.5 8C7.22386 8 7 8.22386 7 8.5C7 8.77614 7.22386 9 7.5 9V8.5V8ZM0.5 4C0.223858 4 0 4.22386 0 4.5C0 4.77614 0.223858 5 0.5 5V4.5V4ZM13.8333 5C14.1095 5 14.3333 4.77614 14.3333 4.5C14.3333 4.22386 14.1095 4 13.8333 4V4.5V5ZM5.83333 0.5V1H8.5V0.5V0H5.83333V0.5ZM8.5 11.1667V10.6667H5.83333V11.1667V11.6667H8.5V11.1667ZM5.83333 11.1667V10.6667C4.56212 10.6667 3.65901 10.6656 2.9739 10.5735C2.30317 10.4833 1.91674 10.3142 1.6346 10.0321L1.28105 10.3856L0.927495 10.7392C1.4264 11.2381 2.05904 11.4595 2.84065 11.5646C3.60788 11.6677 4.59039 11.6667 5.83333 11.6667V11.1667ZM0.5 5.83333H0C0 7.07628 -0.00106186 8.05878 0.10209 8.82602C0.207175 9.60763 0.428586 10.2403 0.927495 10.7392L1.28105 10.3856L1.6346 10.0321C1.35246 9.74993 1.18335 9.36349 1.09317 8.69277C1.00106 8.00766 1 7.10455 1 5.83333H0.5ZM13.8333 5.83333H13.3333C13.3333 7.10455 13.3323 8.00766 13.2402 8.69277C13.15 9.36349 12.9809 9.74993 12.6987 10.0321L13.0523 10.3856L13.4058 10.7392C13.9047 10.2403 14.1262 9.60763 14.2312 8.82602C14.3344 8.05878 14.3333 7.07628 14.3333 5.83333H13.8333ZM8.5 11.1667V11.6667C9.74294 11.6667 10.7255 11.6677 11.4927 11.5646C12.2743 11.4595 12.9069 11.2381 13.4058 10.7392L13.0523 10.3856L12.6987 10.0321C12.4166 10.3142 12.0302 10.4833 11.3594 10.5735C10.6743 10.6656 9.77121 10.6667 8.5 10.6667V11.1667ZM8.5 0.5V1C9.77121 1 10.6743 1.00106 11.3594 1.09317C12.0302 1.18335 12.4166 1.35246 12.6987 1.6346L13.0523 1.28105L13.4058 0.927495C12.9069 0.428586 12.2743 0.207175 11.4927 0.10209C10.7255 -0.00106186 9.74294 0 8.5 0V0.5ZM13.8333 5.83333H14.3333C14.3333 4.59039 14.3344 3.60788 14.2312 2.84065C14.1262 2.05904 13.9047 1.4264 13.4058 0.927495L13.0523 1.28105L12.6987 1.6346C12.9809 1.91674 13.15 2.30317 13.2402 2.9739C13.3323 3.65901 13.3333 4.56212 13.3333 5.83333H13.8333ZM5.83333 0.5V0C4.59039 0 3.60788 -0.00106186 2.84065 0.10209C2.05904 0.207175 1.4264 0.428586 0.927495 0.927495L1.28105 1.28105L1.6346 1.6346C1.91674 1.35246 2.30317 1.18335 2.9739 1.09317C3.65901 1.00106 4.56212 1 5.83333 1V0.5ZM0.5 5.83333H1C1 4.56212 1.00106 3.65901 1.09317 2.9739C1.18335 2.30317 1.35246 1.91674 1.6346 1.6346L1.28105 1.28105L0.927495 0.927495C0.428586 1.4264 0.207175 2.05904 0.10209 2.84065C-0.00106186 3.60788 0 4.59039 0 5.83333H0.5ZM5.83333 8.5V8H3.16667V8.5V9H5.83333V8.5ZM8.5 8.5V8H7.5V8.5V9H8.5V8.5ZM0.5 4.5V5H13.8333V4.5V4H0.5V4.5Z" fill="white"/>
</svg>

                           MAKE PAYMENT
                        </button>
                    )}</td>
                  <td className="flex items-center gap-2 ">
                 
                    <button className="p-2 pl-0 hover:bg-gray-100 rounded"
                     onClick={() => handleViewInvoice(invoice)}
                    >
                      <Eye size={16} />
                    </button>
                    <button className="p-2 pl-0 hover:bg-gray-100 rounded">
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
     
    </div>
       {/* Invoice Drawer */}
      <InvoiceDrawer
        isOpen={invoiceDrawerOpen}
        onClose={() => setInvoiceDrawerOpen(false)}
        invoiceData={
          selectedInvoice
            ? {
                planName: 'Upchar-Q Plus',
                planType: 'Plan Subscription',
                status: selectedInvoice.status.toLowerCase(),
                dueDate: selectedInvoice.dueDate,
                invoiceDate: '03/12/2025',
                invoiceNumber: selectedInvoice.id,
                paymentMethod: 'Card Payment 2041',
                billingCycle: 'Half-Yearly',
                seats: selectedInvoice.seats.replace('|', '|'),
                periodStart: 'May 24, 2025',
                periodEnd: 'May 24, 2026',
                lineItems: [
                  { label: 'Plus (Base)', amount: 2299 },
                  { label: 'Base x 6months', amount: 13794 },
                  { label: '6-Month Bonus (1 Month Free)', amount: -2299, isDiscount: true },
                ],
                subtotal: 11495,
                taxes: 2069,
                total: 13564,
                savings: 2713,
              }
            : undefined
        }
      />
    </>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}
