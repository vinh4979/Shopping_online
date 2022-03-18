import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { path } from 'src/constants/path'
import { useAuthenticated } from 'src/Hook/useAuthenticated'
import usePopover from 'src/Hook/usePopover'
import { logout } from 'src/pages/Auth/auth.slice'
import Popover from '../Popover/Popover'
import * as S from './navbar.style'
import user from 'src/assets/Images/user.png'

export default function Navbar() {
  // useAuthentucated tra ve boolean, dung de an logic khi dang nhap roi hien thong tin user
  const authenticated = useAuthenticated()
  const profile = useSelector(state => state.auth.profile)
  // khai bao hook popover
  const { activePopover, showPopover, hidePopover } = usePopover()

  // logout
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <S.Navbar>
      <S.NavMenu>
        {authenticated && (
          <li>
            <S.User onMouseEnter={showPopover} onMouseLeave={hidePopover}>
              <S.UserImage src={user} />
              <S.UserName>{profile.name || profile.email}</S.UserName>
              <Popover active={activePopover}>
                <S.UserLink to={path.user}>Tài Khoảng của tôi</S.UserLink>
                <S.UserLink to={path.purchase}>Đơn mua</S.UserLink>
                <S.UserButton onClick={handleLogout}>Đăng xuất</S.UserButton>
              </Popover>
            </S.User>
          </li>
        )}
        {!authenticated && (
          <Fragment>
            <li>
              <S.NavLink to={path.login}>Đăng nhập</S.NavLink>
            </li>
            <li>
              <S.NavLink to={path.register}>Đăng ký</S.NavLink>
            </li>
          </Fragment>
        )}
      </S.NavMenu>
    </S.Navbar>
  )
}
