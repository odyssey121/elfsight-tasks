import React, { useState, useEffect } from 'react';
import { Card, Modal } from 'antd';
import getRequest from '../../constant/request';
import { ArrowRight, ArrowLeft } from './arrows';
import { Spinner } from './spinner';
import "./photoGallery.css";

const { Meta } = Card;
const PhotoGallery = (props) => {
    const [loading, setLoading] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);
    const [result, setResult] = useState([]);
    const [indent, setIndent] = useState(0);
    const { search } = props.location;
    const { history } = props;


    const setShowImage = index => {
        setIndent(index * -100)
        setShowPopUp(!showPopUp);
    }

    const checkLeftCondition = () => indent > (result.length - 1) * -100;
    const getTitleFromIndent = () => {
        const index = indent === 0 ? Math.abs(indent) : Math.abs(indent) / 100;
        const { title } = result[index] || '';
        return title;
    }


    useEffect(() => {
        async function fetchPhotos() {
            setLoading(true);
            let photosRoute, username;
            try {
                photosRoute = `/photos${search.split("&").shift()}`;
                username = search.split("&")[1].split("=")[1];
            } catch (err) {
                history.replace("/");
            }
            const content = await getRequest(photosRoute);
            setLoading(false);
            setResult(content);
        };

        fetchPhotos();
    }, [history, search]);

    return (
        <div className='photos-layout'>
            {loading && <Spinner />}

            {result && result.map((record, index) =>
                <div className='gallery' key={record.id}>
                    <Card
                        onClick={() => setShowImage(index)}
                        hoverable
                        cover={<img alt="thumbnailUrl" src={record.thumbnailUrl} />}
                    >
                        <Meta style={{ fontSize: 12 }} description={`${record.title.slice(0, 22)}...`} />
                    </Card>
                </div>
            )}

            <Modal
                title={getTitleFromIndent()}
                bodyStyle={{ width: "100%" }}
                style={{ width: 100 }}
                visible={showPopUp}
                onOk={() => setShowPopUp(!showPopUp)}
                className="popUp-window"
                centered={true}
                onCancel={() => setShowPopUp(!showPopUp)}
                cancelButtonProps={{ type: "danger" }}
            >
                <div className="slider-layout">
                    <div className="slides" >

                        {result && result.map((record, index) =>
                            <img
                                alt='img'
                                style={{ marginLeft: !index ? String(indent) + "%" : 0 }}
                                src={record.url}
                                key={record.id}
                            >
                            </img>
                        )}
                    </div>
                </div>
                <nav className='slider-nav'>
                    <ArrowLeft
                        onClick={() => checkLeftCondition() && setIndent(indent - 100)}
                        style={{ cursor: checkLeftCondition() ? 'pointer' : 'not-allowed' }}
                    />
                    <ArrowRight
                        onClick={() => indent && setIndent(indent + 100)}
                        style={{ cursor: indent ? 'pointer' : 'not-allowed' }}
                    />
                </nav>
            </Modal>
        </div>
    )
}

export default PhotoGallery;

