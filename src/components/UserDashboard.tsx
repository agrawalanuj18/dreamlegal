import React, { useEffect, useState } from "react";
import BookMarkCard from "./BookMarkCard";
import { IoIosNotifications } from "react-icons/io";
import SliderElement from "./Silder";
import { ScrollArea } from "./ui/scroll-area";
import UserReviewCard from "./UserReviewCard";
import SavedItems from "./SavedItems";

function UserDashboard() {
  type Review = {
    id: string;
    userId: string;
    productId: string;
    involvement: string[];
    WhyBought: string[];
    GoalBehind: string[];
    otherProducts: string;
    oftenUsed: string;
    overallExperienc: string;
    bestThing: string;
    worstThing: string;
    easeOfLearning: number;
    integration: number;
    support: number;
    roi: number;
    functionality: Record<string, any>;
    processStep: Record<string, any>;
    recommend: number;
    reference: string;
    attachement?: string;
    createdAt: string;
    updatedAt: string;
    product: JSON;
  };

  const [userReviews, setUserReviews] = React.useState<Review[]>([]);
  const [savedProducts, setSavedProducts] = useState();
  const [savedProductsResponse, setSavedProductsResponse] = useState([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    const fetchReviews = (userId: any) => {
      if (userId) {
        fetch("/api/get-user-review", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            setUserReviews(data.userReviews);
          })
          .catch((error) => {
            console.error("Error fetching reviews:", error);
          });
      }
    };

    const fetchSavedProducts = (userId: any) => {
      if (userId) {
        fetch("/api/user-bookmark", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Saved products:", data);
            setSavedProductsResponse(data.products);
          })
          .catch((error) => {
            console.error("Error fetching saved products:", error);
          });
      }
    };

    const fetchNotifications = (userId: any) => {
      if (userId) {
        fetch(`/api/get-user-notifications?userId=${userId}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Notifications:", data);
            setNotifications(data.notifications);
          })
          .catch((error) => {
            console.error("Error fetching notifications:", error);
          });
      }
    };

    fetchReviews(userId);
    fetchSavedProducts(userId);
    fetchNotifications(userId);
  }, [userId]);

  useEffect(() => {
    console.log("Saved products useEffect:", savedProductsResponse);
  }, [savedProductsResponse]);

  return (
    <div className="font-clarity">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div>
            <h2 className=" text-gray-900 text-xl font-bold ">
              Reviewed Products
            </h2>

            <ScrollArea className="md:h-72 border rounded-md px-4 py-5">
              {userReviews.length === 0 ? (
                <p className=" text-gray-500 font-bold  text-center">
                  No reviews yet
                </p>
              ) : (
                userReviews.map((review: Review) => (
                  <UserReviewCard key={review.id} review={review} />
                ))
              )}
            </ScrollArea>
          </div>

          <div>
            <h2 className=" text-gray-900 text-xl font-bold ">Notifications</h2>
            <ScrollArea className=" md:h-72 border rounded-md px-4 py-5">
              {notifications.length === 0 ? (
                <p className="text-gray-500 font-bold text-center">
                  No notifications yet
                </p>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-center gap-4 py-1"
                  >
                    <div className="bg-primary2 text-primary1 p-3 rounded-full">
                      <IoIosNotifications />
                    </div>
                    <div className="space-x-2">
                      <span className="text-sm text-gray-900 font-bold">
                        {notification.message}
                      </span>
                      <span className="text-xs text-slate-500">
                        {new Date(notification.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </ScrollArea>
          </div>
        </div>

        <h2 className=" text-gray-900 text-xl font-bold ">Bookmarked</h2>
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 my-4 ">
          <div className=" col-span-3">
            <SliderElement>
              {savedProductsResponse.length === 0 ? (
                <p className="text-gray-500 font-bold text-center">
                  No bookmarked items yet
                </p>
              ) : (
                savedProductsResponse?.map((product: any) => (
                  <BookMarkCard key={product.id} product={product} />
                ))
              )}
            </SliderElement>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
