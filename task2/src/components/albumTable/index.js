import React, { useState, useEffect } from 'react';
import { Table, Icon, Avatar } from 'antd';
// import { albumsApi, photosApi, headers } from '../constant';
import getRequest from '../../constant/request';

const placeholder = <Icon type="loading" style={{ fontSize: 44 }} spin />;

const AlbumTable = (props) => {


    const [result, setResult] = useState([]);
    const [error, setError] = useState([]);
    const { search } = props.location;
    const { history } = props;

    useEffect(() => {
        const ac = new AbortController();
        let albumsRoute, allPhotosRoute, username;
        try {
            albumsRoute = `/albums${search.split("&").shift()}`;
            allPhotosRoute = "/photos/";
            username = search.split("&")[1].split("=")[1]
        } catch (err) {
            history.replace("/");
        }

        Promise.all([
            getRequest(albumsRoute), getRequest(allPhotosRoute)
        ]).then(
            results => {
                const albums = results[0];
                const allPhotos = results[1];
                const preparedAlbums = albums.map(recordAlbum => {
                    const currAlbumPhotos = allPhotos.filter(recordPhoto => recordPhoto.albumId === recordAlbum.id);
                    const photoCount = currAlbumPhotos.length || 0;
                    const { thumbnailUrl } = currAlbumPhotos[0 + Math.floor(((photoCount - 1) - 0) * Math.random())];

                    return {
                        thumbnailUrl,
                        photoCount,
                        username,
                        albumId: recordAlbum.id,
                        ...recordAlbum
                    }

                });
                setResult(preparedAlbums);
            }
        ).catch(err => {
            setError(err);
            console.log('err--->', err);
        })
        return () => ac.abort();
    }, [search, history]);

    const renderAlbumColumns = () => ([
        {
            title: "username",
            dataIndex: "username",
            key: "username",
            width: "15%",
            render: username => <div>{username && username}</div>,
            sorter: (a, b) => {
                return a.username.localeCompare(b.username);
            }
        },
        {
            title: "title",
            dataIndex: "title",
            key: "title",
            width: "60%",
            render: title => <div>{title && title}</div>,
            sorter: (a, b) => {
                return a.title.localeCompare(b.title);
            }
        },
        {
            title: 'cover',
            dataIndex: 'thumbnailUrl',
            key: 'thumbnailUrl',
            width: '15%',
            render: thumbnailUrl => (
                <div>
                    <Avatar
                        shape="square"
                        size="large"
                        src={thumbnailUrl}
                    />
                </div>
            ),
        },
        {
            title: "photos",
            dataIndex: "photoCount",
            key: "photoCount",
            width: "10%",
            render: photoCount => <div>{photoCount && photoCount}</div>,
            sorter: (a, b) => {
                return a.photoCount - b.photoCount;
            }
        },]);

    const getToPhotos = (albumId, username) => props.history.push(`/albums/photos/?albumId=${albumId}&username=${username}`);

    return (
        <div className='table-layout'>
            <Table
                onRow={(record, index) => ({
                    index,
                    onClick: () =>
                        getToPhotos(record.albumId, record.username)
                })}
                rowKey="id"
                locale={{ emptyText: placeholder }}
                dataSource={result}
                columns={renderAlbumColumns()}
            ></Table>
        </div>
    )
}

export default AlbumTable;

