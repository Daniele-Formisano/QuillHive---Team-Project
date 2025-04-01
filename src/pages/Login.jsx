import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useLazyGetUserLanguagesQuery,
  useLazyGetUsersQuery,
} from "../services/apiService";
import { useDispatch } from "react-redux";
import { setUser } from "../features/global/globalSlice";

export default function Login({ languages }) {
  const [inputsValue, setinputsValue] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [triggerGetUser] = useLazyGetUsersQuery();
  const [triggerGetUserLanguages] = useLazyGetUserLanguagesQuery();

  // funzione per modifcare lo stato che controlla gli inputs del form
  function handleChange(e) {
    const { name, value } = e.target;
    setinputsValue((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }));
  }

  async function fetchUserLanguages(id) {
    try {
      const response = await triggerGetUserLanguages(id);

      if (!response.data.length) {
        return [];
      }

      // per estrarre solo l'id dalla tabella userLanguages
      const userLanguagesId = response.data.map(
        (userLanguages) => userLanguages.languageId
      );

      //metch tra l'id delle lingue e quello presente nella tabella userLanguages
      const userLanguages = languages.filter((language) =>
        userLanguagesId.includes(language.id)
      );

      return userLanguages;
    } catch (error) {
      console.error("Error fetching user languages:", error);
      return [];
    }
  }

  // funzione per inviare il form, verificare l'utente se esiste, nel caso settarlo in redux, e redirect alla home
  function handleSubmit(e) {
    e.preventDefault();

    toast.promise(
      async () => {
        try {
          const response = await triggerGetUser(inputsValue);

          if (!response.data.length) {
            throw new Error("Invalid email or password");
          }

          const [user] = response.data;
          const userLanguages = await fetchUserLanguages(user.id);
          const userWithLanguages = { ...user, languages: userLanguages };

          dispatch(setUser(userWithLanguages)); // impostare l'utente nel redux con le lingue parlate
          console.log(userWithLanguages);
          localStorage.setItem("user", JSON.stringify(userWithLanguages)); // salva l'utente nel local storage
          //navigate("/home"); //attualmente disabilitato per evitare il redirect
          return response;
        } catch (error) {
          throw error;
        }
      },
      {
        loading: "Loading...",
        success: <b>Logged</b>,
        error: (err) => <b>{err.message || "Error"}</b>,
      }
    );
  }

  return (
    <div className="flex flex-col gap-10 p-8 justify-center min-h-screen overflow-auto bg-bg-brand">
      <div className="inline-flex justify-center">
        <svg
          width="238"
          height="238"
          viewBox="0 0 238 238"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M51.1485 131.043C51.1265 133.329 50.8334 135.964 49.8638 138.494C48.2947 142.582 45.3153 145.044 41.1084 146.082C40.3151 146.278 39.4953 146.375 38.6888 146.522C38.5566 146.546 38.3428 146.483 38.3516 146.71C38.3604 146.923 38.5676 146.864 38.702 146.89C39.4182 147.025 40.1278 147.177 40.8021 147.465C42.3447 148.124 43.3011 149.306 43.8565 150.855C44.165 151.714 44.4184 152.596 44.8636 153.4C45.0949 153.819 45.388 154.176 45.8486 154.354C46.8116 154.729 47.6821 154.37 48.1074 153.404C48.3873 152.768 48.5504 152.093 48.5746 151.399C48.5944 150.861 48.914 150.892 49.2952 150.914C49.7558 150.941 49.65 151.218 49.6214 151.505C49.5552 152.157 49.4362 152.798 49.2026 153.411C48.5305 155.176 47.2612 156.324 45.4519 156.809C43.6251 157.296 41.785 157.23 39.989 156.628C37.7368 155.873 36.5358 154.134 35.7601 152.014C35.4141 151.068 35.1783 150.083 34.753 149.169C34.2087 147.999 33.6137 147.772 32.4148 148.281C31.6876 148.592 31.0287 149.023 30.4491 149.555C30.0987 149.874 29.9202 149.755 29.6448 149.462C29.3319 149.129 29.5588 148.984 29.7792 148.803C30.7907 147.983 31.9014 147.346 33.1685 147.007C33.3007 146.972 33.5189 147.02 33.4946 146.8C33.4726 146.593 33.2611 146.666 33.1266 146.648C30.6254 146.317 28.2807 145.575 26.2511 144.025C23.7499 142.115 22.2866 139.532 21.6299 136.506C20.6427 131.947 20.7396 127.414 22.4673 123.029C24.3096 118.352 27.8289 115.651 32.7278 114.723C35.6058 114.179 38.4927 114.216 41.3332 114.974C45.9808 116.21 48.8567 119.267 50.2428 123.802C50.9237 126.032 51.1507 128.328 51.1507 131.05L51.1485 131.043ZM41.8313 130.836C41.8357 128.095 41.8577 125.706 41.7123 123.319C41.6197 121.812 41.4875 120.305 41.0313 118.853C40.4517 117.004 39.3389 115.719 37.3181 115.419C36.798 115.342 36.2757 115.353 35.7512 115.362C33.5916 115.399 32.1063 116.415 31.335 118.438C31.183 118.837 31.0552 119.249 30.9516 119.664C30.372 122.002 30.3588 124.397 30.3169 126.779C30.2618 130.083 30.2398 133.388 30.3764 136.692C30.4381 138.166 30.5527 139.633 30.8502 141.079C31.0948 142.274 31.4606 143.435 32.254 144.396C33.3558 145.729 34.8521 146.031 36.4873 145.989C38.5213 145.936 39.9956 144.92 40.7404 143.021C41.4258 141.275 41.5977 139.44 41.7101 137.595C41.8555 135.228 41.8489 132.857 41.8313 130.836Z"
            fill="#F5C43D"
          />
          <path
            d="M125.513 133.199C125.513 129.201 125.502 125.204 125.526 121.206C125.528 120.693 125.38 120.558 124.9 120.605C124.492 120.644 124.078 120.598 123.666 120.618C123.353 120.633 123.245 120.532 123.243 120.208C123.243 119.871 123.415 119.864 123.664 119.864C127.348 119.869 131.031 119.869 134.715 119.864C135 119.864 135.154 119.895 135.154 120.245C135.154 120.609 134.975 120.629 134.702 120.62C134.292 120.607 133.876 120.646 133.468 120.609C133.036 120.569 132.941 120.73 132.944 121.142C132.961 124.168 132.952 127.196 132.952 130.222C132.952 130.819 132.963 131.418 132.948 132.015C132.941 132.302 133.036 132.405 133.334 132.405C135.614 132.397 137.895 132.397 140.176 132.405C140.452 132.405 140.522 132.308 140.522 132.048C140.515 128.348 140.515 124.651 140.522 120.951C140.522 120.664 140.412 120.607 140.158 120.613C139.654 120.627 139.149 120.602 138.645 120.622C138.345 120.635 138.265 120.525 138.263 120.237C138.259 119.937 138.36 119.862 138.649 119.864C141.062 119.875 143.473 119.871 145.886 119.871C147.138 119.871 148.392 119.871 149.643 119.871C149.908 119.871 150.196 119.776 150.19 120.252C150.183 120.743 149.868 120.607 149.617 120.613C149.187 120.624 148.755 120.635 148.328 120.611C147.997 120.591 147.889 120.726 147.931 121.032C147.94 121.105 147.931 121.182 147.931 121.257C147.931 129.214 147.935 137.174 147.92 145.132C147.92 145.625 148.017 145.839 148.55 145.775C148.956 145.727 149.372 145.777 149.782 145.762C150.051 145.751 150.183 145.802 150.185 146.121C150.185 146.456 150.057 146.52 149.756 146.52C146.071 146.511 142.389 146.514 138.704 146.52C138.426 146.52 138.257 146.505 138.257 146.143C138.257 145.791 138.413 145.753 138.695 145.764C139.143 145.782 139.594 145.74 140.039 145.777C140.454 145.813 140.522 145.65 140.52 145.273C140.507 141.48 140.507 137.688 140.52 133.895C140.52 133.518 140.447 133.384 140.037 133.388C137.831 133.41 135.625 133.406 133.417 133.39C133.063 133.39 132.937 133.476 132.937 133.853C132.95 137.683 132.95 141.513 132.937 145.343C132.937 145.698 133.052 145.793 133.386 145.773C133.834 145.747 134.283 145.775 134.733 145.764C134.989 145.758 135.149 145.777 135.147 146.11C135.145 146.43 135.044 146.52 134.729 146.52C131.044 146.511 127.362 146.511 123.677 146.52C123.384 146.52 123.243 146.467 123.238 146.126C123.232 145.74 123.446 145.764 123.701 145.766C124.131 145.773 124.563 145.74 124.99 145.777C125.409 145.815 125.521 145.681 125.519 145.257C125.499 142.437 125.508 139.616 125.508 136.795C125.508 135.599 125.508 134.404 125.508 133.208L125.513 133.199Z"
            fill="#203955"
          />
          <path
            d="M66.5612 143.893C66.4422 144.048 66.3871 144.096 66.3584 144.158C65.5673 145.925 64.0864 146.668 62.2661 146.837C60.783 146.974 59.3044 146.915 57.9491 146.196C56.4219 145.385 55.7145 144.012 55.417 142.375C55.3134 141.802 55.2892 141.227 55.2892 140.647C55.2892 137.004 55.276 133.362 55.3046 129.719C55.309 129.157 55.1416 128.998 54.6149 129.06C54.2645 129.102 53.9053 129.056 53.5505 129.071C53.2706 129.084 53.145 129.005 53.1516 128.697C53.156 128.39 53.3235 128.381 53.5483 128.381C56.3536 128.384 59.1567 128.392 61.962 128.375C62.4182 128.373 62.3631 128.633 62.3631 128.915C62.3631 133.304 62.3653 137.694 62.3675 142.084C62.3675 142.721 62.4512 143.347 62.5548 143.973C62.7531 145.167 63.5795 145.414 64.6483 144.953C65.2962 144.673 65.6929 144.12 65.9662 143.488C66.3033 142.705 66.4399 141.883 66.4377 141.033C66.4355 137.223 66.4311 133.41 66.4444 129.6C66.4444 129.19 66.3474 129.009 65.9155 129.06C65.6378 129.091 65.3535 129.054 65.0759 129.069C64.8092 129.084 64.7211 128.979 64.7166 128.714C64.7144 128.425 64.8489 128.379 65.0935 128.379C67.7864 128.384 70.4793 128.392 73.1701 128.375C73.6879 128.373 73.5645 128.705 73.5645 128.976C73.5689 134.318 73.5645 139.662 73.5689 145.004C73.5689 145.877 73.4698 145.773 74.3468 145.782C74.6465 145.784 74.9462 145.791 75.2437 145.782C75.4994 145.773 75.6801 145.817 75.6801 146.137C75.6801 146.43 75.5589 146.522 75.2746 146.522C72.6191 146.516 69.9637 146.513 67.3104 146.522C66.9182 146.522 66.9115 146.271 66.8741 146.013C66.7749 145.341 66.6757 144.667 66.5634 143.891L66.5612 143.893Z"
            fill="#F5C43D"
          />
          <path
            d="M97.6974 131.85C97.6974 136.295 97.7062 140.74 97.6842 145.185C97.682 145.692 97.8297 145.846 98.3145 145.793C98.6649 145.755 99.0241 145.793 99.3789 145.784C99.6587 145.775 99.8372 145.83 99.8372 146.179C99.8372 146.516 99.6543 146.525 99.4075 146.525C95.9124 146.522 92.4174 146.522 88.9223 146.525C88.6733 146.525 88.4992 146.511 88.4926 146.176C88.486 145.83 88.6446 145.773 88.9355 145.782C89.3652 145.797 89.795 145.773 90.2247 145.788C90.5156 145.8 90.6412 145.687 90.6147 145.396C90.6059 145.304 90.6147 145.209 90.6147 145.116C90.6147 136.526 90.6103 127.936 90.628 119.344C90.628 118.784 90.5001 118.56 89.9162 118.632C89.5305 118.681 89.1316 118.632 88.7394 118.643C88.4882 118.65 88.3669 118.575 88.3647 118.297C88.3647 118.015 88.4926 117.954 88.7416 117.954C89.9007 117.96 91.0599 117.956 92.219 117.956C93.863 117.956 95.5092 117.973 97.1531 117.945C97.6093 117.936 97.7085 118.084 97.7085 118.513C97.693 122.958 97.6996 127.403 97.6996 131.848L97.6974 131.85Z"
            fill="#F5C43D"
          />
          <path
            d="M109.716 131.916C109.716 136.304 109.716 140.691 109.716 145.079C109.716 145.549 109.96 145.784 110.448 145.784C110.785 145.784 111.122 145.797 111.457 145.78C111.739 145.766 111.856 145.855 111.856 146.156C111.856 146.472 111.715 146.522 111.446 146.522C107.951 146.516 104.456 146.518 100.963 146.52C100.727 146.52 100.522 146.533 100.52 146.187C100.516 145.848 100.674 145.775 100.965 145.782C101.395 145.793 101.825 145.773 102.254 145.788C102.543 145.799 102.671 145.691 102.642 145.401C102.633 145.308 102.642 145.213 102.642 145.121C102.642 136.513 102.636 127.905 102.656 119.298C102.656 118.747 102.508 118.568 101.972 118.634C101.622 118.676 101.263 118.643 100.908 118.641C100.655 118.641 100.377 118.712 100.39 118.277C100.401 117.865 100.674 117.962 100.895 117.962C103.231 117.958 105.567 117.96 107.903 117.96C108.332 117.96 108.764 117.987 109.192 117.951C109.606 117.918 109.736 118.046 109.727 118.474C109.699 119.855 109.716 121.237 109.716 122.619C109.716 125.717 109.716 128.818 109.716 131.916Z"
            fill="#F5C43D"
          />
          <path
            d="M194.479 136.683C192.853 136.683 191.227 136.696 189.6 136.674C189.21 136.67 189.094 136.771 189.1 137.168C189.124 138.737 189.107 140.306 189.42 141.853C189.748 143.477 190.343 144.96 192.097 145.465C194.014 146.018 195.804 145.665 197.305 144.272C198.16 143.479 198.675 142.47 199.05 141.381C199.101 141.236 199.074 141.046 199.321 141.018C199.748 140.969 199.863 141.108 199.722 141.573C198.896 144.31 197.137 146.064 194.297 146.622C192.119 147.049 189.94 147.005 187.804 146.377C184.384 145.37 182.489 143.007 181.934 139.543C181.669 137.89 181.7 136.233 182.112 134.596C182.87 131.581 184.752 129.589 187.681 128.611C189.968 127.846 192.311 127.797 194.647 128.359C197.664 129.084 199.4 131.114 199.76 134.204C199.834 134.854 199.865 135.504 199.883 136.158C199.894 136.562 199.795 136.698 199.361 136.692C197.734 136.663 196.108 136.681 194.482 136.681L194.479 136.683ZM193.076 133.514C193.076 133.514 193.062 133.514 193.058 133.514C193.058 133.289 193.065 133.067 193.058 132.842C193.025 131.799 193.051 130.742 192.672 129.75C192.225 128.58 190.784 128.357 190.015 129.322C189.779 129.618 189.638 129.962 189.539 130.325C189.065 132.062 189.193 133.84 189.162 135.61C189.157 135.874 189.29 135.914 189.508 135.912C190.572 135.905 191.637 135.901 192.701 135.914C192.994 135.918 193.091 135.821 193.082 135.53C193.065 134.858 193.078 134.186 193.078 133.516L193.076 133.514Z"
            fill="#203955"
          />
          <path
            d="M170.893 129.069C172.421 133.289 173.915 137.421 175.457 141.685C175.803 140.641 176.11 139.724 176.409 138.805C177.408 135.74 178.39 132.67 179.413 129.613C179.583 129.104 179.459 129.027 178.985 129.06C178.465 129.098 177.939 129.06 177.416 129.073C177.152 129.08 177 129.038 177.007 128.714C177.013 128.426 177.139 128.381 177.386 128.381C178.862 128.388 180.341 128.392 181.817 128.381C182.095 128.379 182.159 128.481 182.163 128.738C182.168 129.025 182.046 129.065 181.797 129.078C181.359 129.1 180.817 128.873 180.51 129.184C180.239 129.457 180.204 129.966 180.072 130.374C178.399 135.55 176.72 140.727 175.063 145.91C174.915 146.375 174.719 146.549 174.208 146.527C173.143 146.476 172.077 146.491 171.012 146.522C170.629 146.533 170.47 146.399 170.329 146.053C168.176 140.694 166.006 135.341 163.839 129.988C163.471 129.08 163.476 129.089 162.46 129.067C162.277 129.062 161.977 129.239 161.916 128.877C161.86 128.558 161.922 128.375 162.343 128.379C164.344 128.403 166.345 128.39 168.346 128.39C169.842 128.39 171.339 128.39 172.833 128.39C173.077 128.39 173.304 128.34 173.302 128.736C173.302 129.137 173.064 129.076 172.828 129.076C172.211 129.076 171.596 129.076 170.896 129.076L170.893 129.069Z"
            fill="#203955"
          />
          <path
            d="M160.529 137.09C160.529 139.819 160.538 142.547 160.52 145.273C160.518 145.689 160.626 145.844 161.052 145.808C161.459 145.775 161.874 145.808 162.286 145.797C162.528 145.791 162.669 145.833 162.669 146.126C162.669 146.412 162.585 146.513 162.286 146.511C160.452 146.498 158.621 146.505 156.787 146.505C155.141 146.505 153.497 146.505 151.851 146.505C151.58 146.505 151.338 146.544 151.351 146.123C151.364 145.714 151.622 145.804 151.849 145.799C152.223 145.793 152.6 145.771 152.971 145.806C153.383 145.844 153.46 145.672 153.46 145.295C153.449 140.046 153.447 134.794 153.46 129.545C153.46 129.137 153.325 129.034 152.946 129.058C152.481 129.087 152.012 129.053 151.545 129.069C151.283 129.078 151.186 128.992 151.186 128.719C151.186 128.439 151.294 128.375 151.551 128.377C154.432 128.384 157.312 128.388 160.19 128.373C160.595 128.373 160.529 128.611 160.529 128.846C160.529 131.592 160.529 134.34 160.529 137.086V137.09Z"
            fill="#203955"
          />
          <path
            d="M85.5926 137.066C85.5926 139.772 85.6081 142.481 85.5794 145.187C85.575 145.696 85.7271 145.844 86.2075 145.793C86.5777 145.755 86.9545 145.797 87.327 145.782C87.6024 145.771 87.7324 145.843 87.7324 146.154C87.7324 146.463 87.6046 146.527 87.3292 146.524C83.8165 146.518 80.3038 146.52 76.791 146.524C76.5575 146.524 76.3966 146.496 76.3966 146.198C76.3966 145.923 76.4759 145.777 76.7756 145.786C77.2053 145.797 77.6351 145.773 78.0648 145.793C78.3953 145.808 78.5232 145.709 78.521 145.356C78.5121 140.074 78.5121 134.792 78.521 129.507C78.521 129.164 78.4174 129.047 78.0758 129.064C77.6108 129.089 77.1414 129.062 76.6743 129.073C76.4098 129.08 76.2578 129.031 76.2644 128.71C76.271 128.414 76.4142 128.381 76.6522 128.384C79.5104 128.388 82.3686 128.392 85.229 128.379C85.661 128.379 85.5926 128.637 85.5926 128.893C85.5926 131.619 85.5926 134.342 85.5926 137.068V137.066Z"
            fill="#F5C43D"
          />
          <path
            d="M161.162 122.268C161.162 122.921 161.149 123.575 161.166 124.227C161.175 124.562 161.063 124.796 160.77 124.963C159.606 125.631 158.445 126.303 157.286 126.975C157.037 127.119 156.801 127.119 156.547 126.971C155.386 126.299 154.225 125.631 153.059 124.968C152.766 124.8 152.649 124.554 152.649 124.23C152.649 122.923 152.651 121.618 152.649 120.311C152.649 119.979 152.794 119.752 153.083 119.589C154.216 118.941 155.344 118.286 156.47 117.629C156.772 117.453 157.056 117.449 157.363 117.629C158.489 118.286 159.621 118.934 160.752 119.582C161.038 119.745 161.175 119.968 161.166 120.309C161.149 120.961 161.162 121.614 161.162 122.268Z"
            fill="#203955"
          />
          <path
            d="M86.0661 122.326C86.0661 122.96 86.0573 123.595 86.0705 124.23C86.0771 124.584 85.9471 124.825 85.632 125.003C84.5103 125.636 83.3952 126.277 82.2868 126.934C81.954 127.13 81.6719 127.114 81.3502 126.923C80.2572 126.277 79.1597 125.638 78.0535 125.019C77.7163 124.829 77.5885 124.591 77.5929 124.21C77.6105 122.921 77.6105 121.634 77.5929 120.345C77.5885 119.957 77.7449 119.719 78.0689 119.536C79.1729 118.91 80.2726 118.277 81.3656 117.634C81.6741 117.453 81.9562 117.449 82.2603 117.623C83.3908 118.275 84.5235 118.928 85.6584 119.575C85.9471 119.741 86.0771 119.974 86.0705 120.309C86.0595 120.981 86.0683 121.654 86.0683 122.326H86.0661Z"
            fill="#F5C43D"
          />
          <path
            d="M191.757 87.0031C192.023 86.4918 192.409 86.009 192.532 85.4669C193.001 83.4312 194.287 82.8677 196.278 82.782C199.693 82.637 203.098 82.1923 206.501 81.8285C207.397 81.7333 207.997 81.8998 208.556 82.7107C210.803 85.971 213.14 89.1671 215.44 92.3893C215.766 92.8459 216.208 93.2431 215.892 93.9327C214.21 97.5996 212.558 101.278 210.798 105.174C210.063 104.146 209.478 103.281 208.841 102.456C208.484 101.994 208.577 101.623 208.803 101.141C209.797 99.0003 210.722 96.8268 211.723 94.6865C212.044 93.9993 212.042 93.4809 211.566 92.8435C209.925 90.6343 208.334 88.3871 206.758 86.1327C206.384 85.5976 205.994 85.386 205.321 85.4621C202.449 85.7808 199.571 86.0661 196.689 86.3063C196.097 86.3562 195.864 86.6131 195.65 87.0934C194.765 89.0743 193.802 91.0196 192.965 93.0195C192.566 93.9731 192.095 94.5105 190.963 94.4273C190.178 94.3702 189.374 94.589 188.373 94.7127C189.034 93.1884 189.602 91.8828 190.168 90.5749C190.699 89.3835 191.227 88.1921 191.757 87.0007V87.0031Z"
            fill="#F5C43D"
          />
          <path
            d="M179.36 98.2942C180.78 98.1967 182.202 98.1016 183.8 97.9922C183.258 99.1693 182.782 100.206 182.304 101.241C182.071 101.745 181.584 101.645 181.175 101.69C178.97 101.928 176.766 102.187 174.557 102.354C173.791 102.411 173.368 102.637 173.051 103.376C171.972 105.904 170.828 108.403 169.66 110.891C169.358 111.533 169.37 111.999 169.808 112.589C171.446 114.8 173.054 117.038 174.611 119.307C175.061 119.963 175.548 120.144 176.3 120.06C178.457 119.823 180.628 119.697 182.778 119.416C183.707 119.295 184.319 119.437 184.792 120.303C185.198 121.045 185.767 121.701 186.392 122.576C182.157 122.985 178.14 123.368 174.124 123.765C173.586 123.818 173.353 123.475 173.097 123.119C170.654 119.699 168.222 116.272 165.751 112.874C165.347 112.318 165.38 111.878 165.646 111.293C167.365 107.519 169.059 103.73 170.738 99.9398C171.011 99.3215 171.451 99.1027 172.084 99.0575C173.187 98.9767 174.288 98.8507 175.391 98.7436C176.716 98.5962 178.041 98.4464 179.363 98.2989L179.36 98.2942Z"
            fill="#F5C43D"
          />
          <path
            d="M179.361 98.294C178.036 98.4414 176.711 98.5912 175.389 98.7387C174.184 97.0503 172.997 95.3452 171.758 93.6806C171.397 93.1955 171.337 92.7959 171.554 92.2371C172.831 88.9578 174.089 85.6713 175.311 82.373C175.537 81.7618 175.87 81.612 176.478 81.5977C179.803 81.5098 183.125 81.4004 186.447 81.2363C187.303 81.1935 187.86 81.3885 188.352 82.1423C189.429 83.7998 190.616 85.3883 191.76 87.003C191.229 88.1944 190.702 89.3858 190.171 90.5772C188.973 88.9435 187.736 87.3336 186.59 85.6642C186.152 85.0293 185.703 84.7819 184.932 84.8295C182.961 84.9532 180.985 85.0126 179.009 85.0459C178.331 85.0554 177.974 85.3004 177.741 85.9377C177.061 87.7925 176.338 89.6308 175.606 91.4666C175.332 92.1539 175.399 92.6937 175.87 93.3191C177.085 94.9386 178.205 96.6317 179.363 98.294H179.361Z"
            fill="#203955"
          />
          <path
            d="M209.793 109.48C209.833 110.444 210.054 111.488 209.843 112.436C209.726 112.96 208.744 112.807 208.147 112.857C205.315 113.1 202.48 113.338 199.641 113.497C198.844 113.542 198.442 113.837 198.15 114.55C197.018 117.314 195.798 120.044 194.695 122.821C194.269 123.891 193.724 124.098 192.783 123.506C192.5 123.328 192.188 123.173 191.87 123.081C191.13 122.869 190.916 122.569 191.268 121.763C192.83 118.186 194.328 114.581 195.819 110.974C196.055 110.406 196.366 110.177 196.987 110.137C200.882 109.878 204.773 109.568 208.668 109.293C209.022 109.266 209.427 109.062 209.791 109.48H209.793Z"
            fill="#F5C43D"
          />
          <path
            d="M186.512 99.3427C188.88 102.653 191.089 105.752 193.313 108.838C193.56 109.181 193.66 109.478 193.472 109.889C191.857 113.418 190.257 116.955 188.576 120.655C187.846 119.635 187.27 118.757 186.616 117.944C186.176 117.397 186.457 116.976 186.676 116.496C187.491 114.702 188.257 112.886 189.123 111.116C189.572 110.198 189.57 109.497 188.89 108.658C187.767 107.273 186.868 105.706 185.724 104.341C184.916 103.378 184.845 102.546 185.463 101.514C185.827 100.907 186.083 100.239 186.512 99.3403V99.3427Z"
            fill="#203955"
          />
          <path
            d="M188.963 97.8685C189.177 97.7163 189.21 97.6759 189.253 97.664C191.671 96.9553 193.652 97.2763 194.768 99.8755C195.01 100.439 195.576 100.86 195.828 101.421C196.908 103.844 198.739 104.441 201.172 103.783C201.723 103.633 202.313 103.614 202.889 103.562C205.129 103.362 206.854 104.363 208.063 106.565C204.197 106.941 200.38 107.305 196.563 107.685C196.111 107.73 195.866 107.528 195.624 107.186C193.419 104.085 191.203 100.993 188.965 97.8637L188.963 97.8685Z"
            fill="#203955"
          />
          <path
            d="M162.101 87.6332C161.032 86.1382 161.259 84.847 162.781 83.7594L163.133 83.5073C164.919 82.2303 164.933 82.2184 166.191 83.9829C166.574 84.5204 166.959 84.8937 167.675 84.9484C168.486 85.0102 169.282 85.2623 170.091 85.3693C172.231 85.6571 172.203 85.6357 171.694 87.7616C171.551 88.3585 171.384 88.5821 170.757 88.4346C170.008 88.2587 169.211 88.2539 168.483 88.0256C167.152 87.6094 166.027 87.8615 165.064 88.8413C164.072 89.8519 163.301 89.7354 162.681 88.4584C162.536 88.1588 162.296 87.9067 162.101 87.6308V87.6332Z"
            fill="#F5C43D"
          />
          <path
            d="M185.705 70.7373C187.246 72.8918 187.263 72.9156 185.182 74.4233C184.576 74.8632 184.295 75.3864 184.2 76.0879C184.069 77.0415 183.862 77.9832 183.762 78.9392C183.691 79.6312 183.546 79.9023 182.716 79.781C180.702 79.4885 180.704 79.5551 181.085 77.4981C181.251 76.5992 181.287 75.6718 181.515 74.7919C181.762 73.8336 181.068 73.3365 180.612 72.8015C179.805 71.8574 179.927 71.2534 180.999 70.7207C181.296 70.5733 181.551 70.3355 181.824 70.1405C183.346 69.0513 184.64 69.2511 185.705 70.7397V70.7373Z"
            fill="#F5C43D"
          />
          <path
            d="M206.846 124.655C207.524 125.632 208.221 126.633 208.58 127.152C209.295 128.181 209.697 128.75 211.058 130.695C211.134 130.804 211.222 130.904 211.381 131.106C211.02 129.601 210.651 128.229 210.363 126.842C209.98 124.992 209.616 123.14 209.5 121.271C209.41 119.844 209.402 117.076 209.402 117.076C209.386 116.881 209.367 116.672 209.345 116.441C209.269 115.604 208.965 115.552 208.282 115.637C206.848 115.818 205.398 116.091 203.969 116.027C201.448 115.918 199.8 116.745 199.229 119.371C199.039 120.243 198.487 121.035 198.119 121.872C197.232 123.887 197.037 124.334 198.261 124.866C198.261 124.866 200.677 125.734 201.885 126.231C205.065 127.534 207.892 129.565 210.841 131.513L206.304 125.026C206.225 125.033 206.154 125.038 206.085 125.045C205.405 125.111 204.875 124.84 204.656 124.315C204.432 123.777 204.596 123.149 205.053 122.802C205.502 122.46 206.125 122.445 206.573 122.766C207.07 123.126 207.212 123.623 207.005 124.298C206.948 124.488 206.851 124.657 206.851 124.657L206.846 124.655Z"
            fill="#203955"
          />
          <path
            d="M67.6509 172V161.296C67.6509 161.061 67.7256 160.885 67.8749 160.768C68.0349 160.64 68.2163 160.576 68.4189 160.576H72.0349C73.0269 160.576 73.8376 160.843 74.4669 161.376C75.1069 161.899 75.4269 162.608 75.4269 163.504C75.4269 164.027 75.2989 164.496 75.0429 164.912C74.7976 165.317 74.4563 165.611 74.0189 165.792V165.808C74.6269 165.936 75.1176 166.267 75.4909 166.8C75.8749 167.333 76.0669 167.968 76.0669 168.704C76.0669 169.685 75.7523 170.48 75.1229 171.088C74.5043 171.696 73.6883 172 72.6749 172H67.6509ZM69.2349 165.264H72.0669C72.6003 165.264 73.0269 165.12 73.3469 164.832C73.6669 164.533 73.8269 164.144 73.8269 163.664C73.8269 163.131 73.6509 162.715 73.2989 162.416C72.9469 162.107 72.4563 161.952 71.8269 161.952H69.2349V165.264ZM69.2349 170.624H72.1789C72.8509 170.624 73.3896 170.448 73.7949 170.096C74.2109 169.733 74.4189 169.259 74.4189 168.672C74.4189 168.021 74.2163 167.52 73.8109 167.168C73.4056 166.805 72.8296 166.624 72.0829 166.624H69.2349V170.624ZM85.3018 161.984H79.7818V165.424H84.7578V166.832H79.7818V170.592H85.1578V172H78.1978V161.296C78.1978 161.061 78.2725 160.885 78.4218 160.768C78.5818 160.64 78.7631 160.576 78.9658 160.576H85.3018V161.984ZM94.6456 161.984H89.1256V165.424H94.1016V166.832H89.1256V170.592H94.5016V172H87.5416V161.296C87.5416 161.061 87.6162 160.885 87.7656 160.768C87.9256 160.64 88.1069 160.576 88.3096 160.576H94.6456V161.984ZM105.121 172.176C104.406 172.176 103.734 172.053 103.105 171.808C102.475 171.563 101.905 171.211 101.393 170.752C100.891 170.283 100.491 169.669 100.193 168.912C99.9046 168.144 99.7606 167.28 99.7606 166.32C99.7606 164.507 100.267 163.061 101.281 161.984C102.294 160.907 103.633 160.368 105.297 160.368C106.246 160.368 107.105 160.581 107.873 161.008C108.651 161.424 109.254 162.016 109.681 162.784L108.465 163.6C108.081 162.981 107.606 162.523 107.041 162.224C106.486 161.925 105.899 161.776 105.281 161.776C104.097 161.776 103.153 162.165 102.449 162.944C101.745 163.712 101.393 164.816 101.393 166.256C101.393 167.696 101.761 168.8 102.497 169.568C103.233 170.325 104.139 170.704 105.217 170.704C106.625 170.704 107.846 170.117 108.881 168.944L109.889 169.936C109.313 170.629 108.603 171.179 107.761 171.584C106.929 171.979 106.049 172.176 105.121 172.176ZM117.71 172L114.942 167.376H113.438V172H111.87V161.28C111.87 161.077 111.939 160.912 112.078 160.784C112.216 160.645 112.387 160.576 112.59 160.576H115.774C116.958 160.576 117.864 160.891 118.494 161.52C119.134 162.149 119.454 162.976 119.454 164C119.454 164.885 119.214 165.611 118.734 166.176C118.254 166.731 117.566 167.093 116.67 167.264L119.678 172H117.71ZM113.438 161.968V166.032H115.422C116.2 166.032 116.792 165.856 117.198 165.504C117.614 165.141 117.822 164.629 117.822 163.968C117.822 163.349 117.619 162.864 117.214 162.512C116.808 162.149 116.232 161.968 115.486 161.968H113.438ZM128.88 161.984H123.36V165.424H128.336V166.832H123.36V170.592H128.736V172H121.776V161.296C121.776 161.061 121.851 160.885 122 160.768C122.16 160.64 122.341 160.576 122.544 160.576H128.88V161.984ZM138.499 172L137.251 168.464H132.675L131.427 172H129.699L133.619 161.456C133.843 160.848 134.291 160.544 134.963 160.544C135.325 160.544 135.608 160.619 135.811 160.768C136.024 160.907 136.195 161.141 136.323 161.472L140.227 172H138.499ZM133.171 167.072H136.755L134.963 162.016L133.171 167.072ZM148.262 160.576V161.968H144.79V172H143.206V161.968H139.734V160.576H148.262ZM150.135 172V160.576H151.719V172H150.135ZM161.372 160.576H163.148L159.724 171.264C159.532 171.872 159.057 172.176 158.3 172.176C157.553 172.176 157.084 171.872 156.892 171.264L153.452 160.576L155.292 160.56L158.332 170.512L161.372 160.576ZM171.989 161.984H166.469V165.424H171.445V166.832H166.469V170.592H171.845V172H164.885V161.296C164.885 161.061 164.96 160.885 165.109 160.768C165.269 160.64 165.451 160.576 165.653 160.576H171.989V161.984Z"
            fill="#203955"
          />
        </svg>
      </div>
      <div>
        <h1 className="font-title text-4xl text-secondary-brand text-center">
          Login
        </h1>
      </div>

      <div className="flex flex-col gap-7">
        <LoginForm
          onSubmit={handleSubmit}
          onChange={handleChange}
          inputsValue={inputsValue}
        />

        <p className="font-script text-center text-input-text-brand">
          Not a member?{" "}
          <Link
            className="text-[#2B4F76] hover:underline visited:text-fuchsia-900"
            to="/signup"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}
