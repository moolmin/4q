"use client";

import React, { useState } from "react";
import styles from "./item-card.module.css";
import Heart from "@react-sandbox/heart";
import Detail from "./detail";
import { Drawer, theme, message } from "antd";
import { IoMdHeart } from "react-icons/io";
import { likeImage, unlikeImage } from "../../../../service/photo_api";

type Item = {
  imageId: number;
  userName: string;
  url: string;
  likeCount: number;
  tags: string[];
  categoryName: string;
  createdAt: string;
  liked: boolean;
};

type ItemCardProps = {
  item: Item;
};

export default function ItemCard({ item }: ItemCardProps) {
  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(item.liked); 
  const [likeCount, setLikeCount] = useState(item.likeCount); 

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    sessionStorage.setItem("createStep", "false");
  };

  const clickHeart = async () => {
    const accessToken = localStorage.getItem('AccessToken'); // Check for token in localStorage

    if (!accessToken) {
      message.error("로그인이 필요합니다."); // Display error message if token is missing
      return; // Stop further execution
    }

    try {
      if (active) {
        const response = await unlikeImage(item.imageId.toString());
        if (response) {
          setActive(false);
          setLikeCount(likeCount - 1); 
        }
      } else {
        const response = await likeImage(item.imageId.toString());
        if (response) {
          setActive(true);
          setLikeCount(likeCount + 1); 
        }
      }
    } catch (error) {
      console.error("Failed to toggle like status:", error);
    }
  };

  const containerStyle: React.CSSProperties = {
    height: 200,
    padding: 48,
    overflow: "hidden",
    background: token.colorFillAlter,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div className={styles.container}>
      <div className={styles.itemContainer}>
        <div className={styles.heartCircle}>
          <Heart
            width={25}
            height={25}
            active={active}
            onClick={clickHeart}  
          />
        </div>
        <div className={styles.imgContainer}>
          <img
            width={200}
            height={200}
            src={item.url}
            alt="photo QR"
            onClick={showDrawer}
          />
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <span>{item.userName}</span>
        <div className={styles.heartCount}>
          <IoMdHeart />
          <span>{likeCount}</span> {/* Update like count in real-time */}
        </div>
      </div>
      <Drawer
        title="4Q 상세보기"
        placement="bottom"
        closable={true}
        onClose={onClose}
        open={open}
        height="97%"
        getContainer={false}
        className={styles.drawerContainer}
      >
        <div className={styles.detailContainer}>
          {/* Pass item as a prop to the Detail component */}
          <Detail item={item} />
        </div>
      </Drawer>
    </div>
  );
}
