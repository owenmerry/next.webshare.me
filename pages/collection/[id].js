import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import Menu from "../../components/Menu";
import {
  Wrapper,
  Alert,
  CardList,
  ProfileTitle,
  CardEdit,
} from "owenmerry-designsystem";
import {
  formatListLinks,
  postData,
  fetchData,
  isURL,
} from "../../helpers/general";
import { siteSettings } from "../../helpers/settings";
import { formatListCollections } from "../../helpers/general";

const CollectionLinks = (props) => {
  //variables
  const loadingEmpty = {
    title: "loading",
    subtitle: "loading",
  };

  //state
  const [stateListLoading, setStateListLoading] = useState(true);
  const [stateList, setStateList] = useState([
    loadingEmpty,
    loadingEmpty,
    loadingEmpty,
    loadingEmpty,
    loadingEmpty,
    loadingEmpty,
  ]);
  const [stateCollection, setCollection] = useState({});
  const [stateStatus, setStateStatus] = useState("");
  const [stateEditable, setStateEditable] = useState(false);

  //pop ups
  const [stateEditShow, setStateEditShow] = useState(false);
  const [stateEditData, setStateEditData] = useState({});
  const [stateCollectionAddShow, setStateCollectionAddShow] = useState(false);
  const [stateCollectionAddData, setStateCollectionAddData] = useState({});

  //collection states
  const [stateCollectionListLoading, setStateCollectionListLoading] = useState(
    true
  );
  const [stateCollectionList, setStateCollectionList] = useState([
    loadingEmpty,
    loadingEmpty,
    loadingEmpty,
  ]);
  //move
  const [stateCollectionMoveShow, setStateCollectionMoveShow] = useState(false);
  const [stateCollectionMoveData, setStateCollectionMoveData] = useState({});
  //collection edit
  const [stateCollectionEditShow, setStateCollectionEditShow] = useState(false);
  const [stateCollectionEditData, setStateCollectionEditData] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await postData(
      `${siteSettings.apiWebsite}/api/link/collectionbyhash`,
      { collectionid: props.query.id }
    );

    setData(data);
    setCollections(data);
  };

  const setData = (data) => {
    const cardList = formatListLinks(data.links);

    setStateList(cardList);
    setCollection(data.collection);
    setStateEditable(data.isEditable);
    setStateListLoading(false);
  };

  const refreshCards = async () => {
    const data = await postData(
      `${siteSettings.apiWebsite}/api/link/collectionbyhash`,
      { collectionid: props.query.id }
    );

    setData(data);
  };

  const addLinkToCollection = async (website) => {
    if (isURL(website)) {
      const added = await postData(`${siteSettings.apiWebsite}/api/link/add`, {
        website: website,
        collection_id: stateCollection.id,
      });
      if (added.status === "created") {
        refreshCards();
      }
      if (added.status === "error") {
        setStateStatus({
          type: "error",
          text:
            "Hmm, something seems to have gone wrong with adding that link.",
        });
      }
      if (added.status === "existed") {
        setStateStatus({
          type: "warning",
          text: "This link is already saved in your links",
        });
      }
    } else {
      setStateStatus({
        type: "error",
        text: "Hmm, that link doesn't seem to be a valid website address",
      });
    }
  };

  const cardMoreMenuClicked = async (data) => {
    if (data.ref === "edit") {
      cardEditShow(data.id);
    }
    if (data.ref === "addtocollection") {
      cardCollectionAddShow(data.id);
    }
    if (data.ref === "remove") {
      const deleteLink = await postData(
        siteSettings.apiWebsite +
          "/api/collection/delete/" +
          stateCollection.id +
          "/" +
          data.id,
        { _method: "DELETE" }
      );
      setStateStatus({
        type: "success",
        text: "Your link was removed from this collection",
      });
      refreshCards();
    }
    if (data.ref === "refresh") {
      const refreshLink = await fetchData(
        siteSettings.apiWebsite + "/api/link/refresh/" + data.id
      );
      refreshCards();
    }
    if (data.ref === "delete") {
      const deleteLink = await postData(
        siteSettings.apiWebsite + "/api/link/delete/" + data.id,
        { _method: "DELETE" }
      );
      setStateStatus({ type: "success", text: "Your link was deleted" });
      refreshCards();
    }
  };

  const cardEditShow = async (id) => {
    const getLink = await fetchData(
      siteSettings.apiWebsite + "/api/link/getlink/" + id
    );
    console.log(getLink);
    setStateEditData({
      linkid: getLink.link.id,
      image: getLink.link.image,
      title: getLink.link.title,
      description: getLink.link.description,
      url: getLink.link.url,
      privacy: getLink.link.privacy_id,
    });
    setStateEditShow(true);
  };
  const cardEditSubmit = async (formData) => {
    const updateLink = await postData(
      siteSettings.apiWebsite + "/api/link/update",
      { ...formData }
    );
    setStateStatus({
      type: "success",
      text: "Your link was edited successfully",
    });
    refreshCards();
    setStateEditShow(false);
  };

  // collection functions
  const cardCollectionAddShow = async (id) => {
    const getCollections = await postData(
      siteSettings.apiWebsite + "/api/collection/mycollections"
    );
    console.log(getCollections);
    setStateCollectionAddData({
      linkid: id,
      collections: getCollections.collections,
    });
    setStateCollectionAddShow(true);
  };
  const cardCollectionAddSubmit = async (formData) => {
    const updateLink = await fetchData(
      siteSettings.apiWebsite +
        "/api/link/linktocollection/" +
        formData.linkid +
        "/" +
        formData.collectionid
    );
    setStateCollectionAddShow(false);
    setStateStatus({
      type: "success",
      text: "Your link was added to the collection",
    });
  };

  const setCollections = (dataCollections) => {
    const cardList = formatListCollections(dataCollections.collections);

    setStateCollectionList(cardList);
    setStateCollectionListLoading(false);
  };

  const cardCollectionMoreMenuClicked = async (data) => {
    if (data.ref === "edit") {
      cardCollectionEditShow(data.id);
    }
    if (data.ref === "delete") {
      const deleteCollection = await postData(
        siteSettings.apiWebsite + "/api/collection/delete/" + data.id,
        { _method: "DELETE" }
      );
      setStateStatus({ type: "success", text: "Your collection was deleted" });
      refreshCards();
    }
    if (data.ref === "collection") {
      moveCollectionShow(data.id);
    }
  };

  const moveCollectionShow = async (id) => {
    const getCollections = await postData(
      siteSettings.apiWebsite + "/api/collection/mycollections"
    );
    console.log(getCollections);
    setStateCollectionMoveData({
      collectionid: id,
      collections: getCollections.collections,
    });
    setStateCollectionMoveShow(true);
  };

  const cardCollectionMoveSubmit = async (formData) => {
    const updateLink = await fetchData(
      siteSettings.apiWebsite +
        "/api/collection/movecollection/" +
        formData.collectionid +
        "/" +
        formData.parentid
    );
    setStateCollectionMoveShow(false);
    setStateStatus({ type: "success", text: "Your collection has been moved" });
  };

  const cardCollectionEditShow = async (id) => {
    const getCollection = await fetchData(
      siteSettings.apiWebsite + "/api/collection/getcollection/" + id
    );
    console.log(getCollection);
    setStateCollectionEditData({
      collectionid: getCollection.collection.id,
      name: getCollection.collection.name,
    });
    setStateCollectionEditShow(true);
  };
  const cardCollectionEditSubmit = async (formData) => {
    const updateCollection = await postData(
      siteSettings.apiWebsite + "/api/collection/update",
      { ...formData }
    );
    refreshCards();
    setStateCollectionEditShow(false);
    setStateStatus({ type: "success", text: "Your collection was edited" });
  };

  return (
    <div>
      <Menu page="collections" />
      <ProfileTitle
        loading={stateListLoading}
        title={stateCollection.name}
        titleTextTop={`Collection`}
        titleTextBottom={`${stateList.length} Links in this collection`}
      />
      <Wrapper>
        <Alert type={stateStatus.type} text={stateStatus.text} />
      </Wrapper>
      <CardEdit
        show={stateEditShow}
        onPopUpHidden={() => setStateEditShow(false)}
        onSubmit={cardEditSubmit}
        data={stateEditData}
      />
      <CardEdit
        show={stateCollectionAddShow}
        onPopUpHidden={() => setStateCollectionAddShow(false)}
        onSubmit={cardCollectionAddSubmit}
        data={stateCollectionAddData}
        formType="addtocollection"
      />
      <CardEdit
        show={stateCollectionMoveShow}
        onPopUpHidden={() => setStateCollectionMoveShow(false)}
        onSubmit={cardCollectionMoveSubmit}
        data={stateCollectionMoveData}
        formType="movecollection"
      />
      <CardEdit
        show={stateCollectionEditShow}
        onPopUpHidden={() => setStateCollectionEditShow(false)}
        onSubmit={cardCollectionEditSubmit}
        data={stateCollectionEditData}
        formType="collection"
      />
      <CardList
        items={stateCollectionList}
        cardSettings={{
          shadowLarge: true,
          imageShow: false,
          moreMenuSettings: {
            items: [
              { name: "Edit", ref: "edit", selected: false },
              { name: "Delete", ref: "delete", selected: false },
              { name: "Move Collection", ref: "collection", selected: false },
            ],
            menuClicked: cardCollectionMoreMenuClicked,
          },
        }}
        grid="4"
        loading={stateCollectionListLoading}
        hideControls={true}
        hideNoResults={true}
      />
      <CardList
        items={stateList}
        cardSettings={{
          shadowLarge: true,
          imageHeight: "150px",
          linkNewWindow: true,
          moreMenuSettings: stateEditable && {
            items: [
              {
                name: "Add to Collection",
                ref: "addtocollection",
                selected: false,
              },
              { name: "Edit", ref: "edit", selected: false },
              {
                name: "Remove From Collection",
                ref: "remove",
                selected: false,
              },
              { name: "Refresh", ref: "refresh", selected: false },
              { name: "Delete", ref: "delete", selected: false },
            ],
            menuClicked: cardMoreMenuClicked,
          },
        }}
        grid="4"
        loading={stateListLoading}
        addHide={!stateEditable}
        addItem={addLinkToCollection}
        addItemPlaceholder="Paste website link here"
        addItemButton="Add Link"
        lazyloadShowSubtitle
      />
    </div>
  );
};

CollectionLinks.getInitialProps = async function (props) {
  // const res = await fetch(`http://www.webshare.me/api/link/collection/${props.query.id}`);
  // const data = await res.json();

  // console.log(`Show data fetched. Count: ${data.length}`);

  return {
    server: true,
    query: props.query,
    // links: data.links,
  };
};

export default CollectionLinks;
