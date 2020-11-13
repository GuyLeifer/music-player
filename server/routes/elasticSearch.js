const { Router } = require('express');
const router = Router();

const { Album, Song, Artist, Playlist } = require('../models');

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })


const updateElasticData = async (index, dataArray) => {
    await client.indices.create(
        {
            index: index,
        }
    );
        const body = dataArray.flatMap((doc) => [
        { index: { _index: index } },
        doc,
    ]);
    const { body: bulkResponse } = await client.bulk({ refresh: true, body });
    if (bulkResponse.errors) {
        console.log("ERROR");
        return bulkResponse.errors;
    } else {
        const { body: count } = await client.count({ index: index });
        console.log(count);
        return bulkResponse;
    }
}

const deleteElasticData = async ()=>{
    await client.indices.delete(
        {
            index: '*',
        }
    );
}

router.post('/all', async (req, res) => {
    try {
    const songs  = await Song.findAll({
        attributes: ['id', 'title']
    });
    const artists  = await Artist.findAll({
        attributes: ['id', 'name']
    });
    const albums  = await Album.findAll({
        attributes: ['id', 'name']
    });
    const playlists  = await Playlist.findAll({
        attributes: ['id', 'name']
    });

        updateElasticData('songs', songs);
        updateElasticData('artists', artists);
        updateElasticData('albums', albums);
        updateElasticData('playlists', playlists);
        res.send("all data update")
    } catch (err){
        res.send(err.massage)
    }
})

router.delete('/all', async (req, res) => {
    try {
        deleteElasticData()
        res.send('all data deleted');
    } catch (err) {
        res.send(err.massage);
    }
})

router.get("/all", async (req, res) => {
    const name = req.query.params;
    if (name === "") res.send([])
    else {
        try {
            const songsSearchResults = await client.search({ 
                index: 'songs',
                size: 3,
                body: { 
                    query: {
                        prefix: {
                            title: name
                        }
                    }
                }
            })
    
            const artistsSearchResults = await client.search({ 
                index: 'artists',
                size: 3,
                body: { 
                    query: {
                        prefix: {
                            name: name
                        }
                    }
                }
            })
    
            const albumsSearchResults = await client.search({ 
                index: 'albums',
                size: 3,
                body: { 
                    query: {
                        prefix: {
                            name: name
                        }
                    }
                }
            })
    
            const playlistsSearchResults = await client.search({ 
                index: 'playlists',
                size: 3,
                body: { 
                    query: {
                        prefix: {               
                            name: name
                        }
                    }
                }
            })
    
            res.send([songsSearchResults.body.hits.hits, artistsSearchResults.body.hits.hits, albumsSearchResults.body.hits.hits, playlistsSearchResults.body.hits.hits])
        } catch (e) {
            res.send(e.message);
        }
    };
});

module.exports = router;