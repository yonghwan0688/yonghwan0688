// 🔐 인증 컨텍스트
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

// 초기 상태
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
};

// 액션 타입
const AUTH_ACTIONS = {
  USER_LOADED: 'USER_LOADED',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  AUTH_ERROR: 'AUTH_ERROR',
  SET_LOADING: 'SET_LOADING',
};

// 리듀서
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_ACTIONS.LOGOUT:
    case AUTH_ACTIONS.AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // 사용자 정보 로드
  const loadUser = async () => {
    if (localStorage.token) {
      try {
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          dispatch({
            type: AUTH_ACTIONS.USER_LOADED,
            payload: data.data.user,
          });
        } else {
          dispatch({ type: AUTH_ACTIONS.AUTH_ERROR });
        }
      } catch (error) {
        console.error('사용자 로드 에러:', error);
        dispatch({ type: AUTH_ACTIONS.AUTH_ERROR });
      }
    } else {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // 로그인
  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: data.data,
        });
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      return { success: false, message: '서버 오류가 발생했습니다.' };
    }
  };

  // 회원가입
  const register = async (username, email, password) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: data.data,
        });
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('회원가입 에러:', error);
      return { success: false, message: '서버 오류가 발생했습니다.' };
    }
  };

  // 로그아웃
  const logout = () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // 컴포넌트 마운트 시 사용자 정보 로드
  useEffect(() => {
    loadUser();
  }, []);

  const value = {
    ...state,
    login,
    register,
    logout,
    loadUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
