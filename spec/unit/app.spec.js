describe('Involved', function() {
  'use strict';

  var githubToken = '';
  var eventPayload = [
    {
      "id": "2587421994",
      "type": "WatchEvent",
      "actor": {
        "id": 5501615,
        "login": "TemaSM",
        "gravatar_id": "",
        "url": "https://api.github.com/users/TemaSM",
        "avatar_url": "https://avatars.githubusercontent.com/u/5501615?"
      },
      "repo": {
        "id": 557980,
        "name": "Automattic/socket.io",
        "url": "https://api.github.com/repos/Automattic/socket.io"
      },
      "payload": {
        "action": "started"
      },
      "public": true,
      "created_at": "2015-02-17T18:21:38Z",
      "org": {
        "id": 887802,
        "login": "Automattic",
        "gravatar_id": "",
        "url": "https://api.github.com/orgs/Automattic",
        "avatar_url": "https://avatars.githubusercontent.com/u/887802?"
      }
    },
    {
      "id": "2587242072",
      "type": "ForkEvent",
      "actor": {
        "id": 1038179,
        "login": "carlosjesus",
        "gravatar_id": "",
        "url": "https://api.github.com/users/carlosjesus",
        "avatar_url": "https://avatars.githubusercontent.com/u/1038179?"
      },
      "repo": {
        "id": 557980,
        "name": "Automattic/socket.io",
        "url": "https://api.github.com/repos/Automattic/socket.io"
      },
      "payload": {
        "forkee": {
          "id": 30927745,
          "name": "socket.io",
          "full_name": "carlosjesus/socket.io",
          "owner": {
            "login": "carlosjesus",
            "id": 1038179,
            "avatar_url": "https://avatars.githubusercontent.com/u/1038179?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/carlosjesus",
            "html_url": "https://github.com/carlosjesus",
            "followers_url": "https://api.github.com/users/carlosjesus/followers",
            "following_url": "https://api.github.com/users/carlosjesus/following{/other_user}",
            "gists_url": "https://api.github.com/users/carlosjesus/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/carlosjesus/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/carlosjesus/subscriptions",
            "organizations_url": "https://api.github.com/users/carlosjesus/orgs",
            "repos_url": "https://api.github.com/users/carlosjesus/repos",
            "events_url": "https://api.github.com/users/carlosjesus/events{/privacy}",
            "received_events_url": "https://api.github.com/users/carlosjesus/received_events",
            "type": "User",
            "site_admin": false
          },
          "private": false,
          "html_url": "https://github.com/carlosjesus/socket.io",
          "description": "Realtime application framework (Node.JS server)",
          "fork": true,
          "url": "https://api.github.com/repos/carlosjesus/socket.io",
          "forks_url": "https://api.github.com/repos/carlosjesus/socket.io/forks",
          "keys_url": "https://api.github.com/repos/carlosjesus/socket.io/keys{/key_id}",
          "collaborators_url": "https://api.github.com/repos/carlosjesus/socket.io/collaborators{/collaborator}",
          "teams_url": "https://api.github.com/repos/carlosjesus/socket.io/teams",
          "hooks_url": "https://api.github.com/repos/carlosjesus/socket.io/hooks",
          "issue_events_url": "https://api.github.com/repos/carlosjesus/socket.io/issues/events{/number}",
          "events_url": "https://api.github.com/repos/carlosjesus/socket.io/events",
          "assignees_url": "https://api.github.com/repos/carlosjesus/socket.io/assignees{/user}",
          "branches_url": "https://api.github.com/repos/carlosjesus/socket.io/branches{/branch}",
          "tags_url": "https://api.github.com/repos/carlosjesus/socket.io/tags",
          "blobs_url": "https://api.github.com/repos/carlosjesus/socket.io/git/blobs{/sha}",
          "git_tags_url": "https://api.github.com/repos/carlosjesus/socket.io/git/tags{/sha}",
          "git_refs_url": "https://api.github.com/repos/carlosjesus/socket.io/git/refs{/sha}",
          "trees_url": "https://api.github.com/repos/carlosjesus/socket.io/git/trees{/sha}",
          "statuses_url": "https://api.github.com/repos/carlosjesus/socket.io/statuses/{sha}",
          "languages_url": "https://api.github.com/repos/carlosjesus/socket.io/languages",
          "stargazers_url": "https://api.github.com/repos/carlosjesus/socket.io/stargazers",
          "contributors_url": "https://api.github.com/repos/carlosjesus/socket.io/contributors",
          "subscribers_url": "https://api.github.com/repos/carlosjesus/socket.io/subscribers",
          "subscription_url": "https://api.github.com/repos/carlosjesus/socket.io/subscription",
          "commits_url": "https://api.github.com/repos/carlosjesus/socket.io/commits{/sha}",
          "git_commits_url": "https://api.github.com/repos/carlosjesus/socket.io/git/commits{/sha}",
          "comments_url": "https://api.github.com/repos/carlosjesus/socket.io/comments{/number}",
          "issue_comment_url": "https://api.github.com/repos/carlosjesus/socket.io/issues/comments/{number}",
          "contents_url": "https://api.github.com/repos/carlosjesus/socket.io/contents/{+path}",
          "compare_url": "https://api.github.com/repos/carlosjesus/socket.io/compare/{base}...{head}",
          "merges_url": "https://api.github.com/repos/carlosjesus/socket.io/merges",
          "archive_url": "https://api.github.com/repos/carlosjesus/socket.io/{archive_format}{/ref}",
          "downloads_url": "https://api.github.com/repos/carlosjesus/socket.io/downloads",
          "issues_url": "https://api.github.com/repos/carlosjesus/socket.io/issues{/number}",
          "pulls_url": "https://api.github.com/repos/carlosjesus/socket.io/pulls{/number}",
          "milestones_url": "https://api.github.com/repos/carlosjesus/socket.io/milestones{/number}",
          "notifications_url": "https://api.github.com/repos/carlosjesus/socket.io/notifications{?since,all,participating}",
          "labels_url": "https://api.github.com/repos/carlosjesus/socket.io/labels{/name}",
          "releases_url": "https://api.github.com/repos/carlosjesus/socket.io/releases{/id}",
          "created_at": "2015-02-17T17:14:31Z",
          "updated_at": "2015-02-17T16:50:40Z",
          "pushed_at": "2015-02-14T18:57:57Z",
          "git_url": "git://github.com/carlosjesus/socket.io.git",
          "ssh_url": "git@github.com:carlosjesus/socket.io.git",
          "clone_url": "https://github.com/carlosjesus/socket.io.git",
          "svn_url": "https://github.com/carlosjesus/socket.io",
          "homepage": "http://socket.io",
          "size": 17490,
          "stargazers_count": 0,
          "watchers_count": 0,
          "language": null,
          "has_issues": false,
          "has_downloads": true,
          "has_wiki": true,
          "has_pages": false,
          "forks_count": 0,
          "mirror_url": null,
          "open_issues_count": 0,
          "forks": 0,
          "open_issues": 0,
          "watchers": 0,
          "default_branch": "master",
          "public": true
        }
      },
      "public": true,
      "created_at": "2015-02-17T17:14:32Z",
      "org": {
        "id": 887802,
        "login": "Automattic",
        "gravatar_id": "",
        "url": "https://api.github.com/orgs/Automattic",
        "avatar_url": "https://avatars.githubusercontent.com/u/887802?"
      }
    },
    {
      "id": "2587172887",
      "type": "WatchEvent",
      "actor": {
        "id": 2651837,
        "login": "plamen1982",
        "gravatar_id": "",
        "url": "https://api.github.com/users/plamen1982",
        "avatar_url": "https://avatars.githubusercontent.com/u/2651837?"
      },
      "repo": {
        "id": 557980,
        "name": "Automattic/socket.io",
        "url": "https://api.github.com/repos/Automattic/socket.io"
      },
      "payload": {
        "action": "started"
      },
      "public": true,
      "created_at": "2015-02-17T16:50:40Z",
      "org": {
        "id": 887802,
        "login": "Automattic",
        "gravatar_id": "",
        "url": "https://api.github.com/orgs/Automattic",
        "avatar_url": "https://avatars.githubusercontent.com/u/887802?"
      }
    },
    {
      "id": "2587150344",
      "type": "IssueCommentEvent",
      "actor": {
        "id": 523210,
        "login": "peteruithoven",
        "gravatar_id": "",
        "url": "https://api.github.com/users/peteruithoven",
        "avatar_url": "https://avatars.githubusercontent.com/u/523210?"
      },
      "repo": {
        "id": 557980,
        "name": "Automattic/socket.io",
        "url": "https://api.github.com/repos/Automattic/socket.io"
      },
      "payload": {
        "action": "created",
        "issue": {
          "url": "https://api.github.com/repos/Automattic/socket.io/issues/1956",
          "labels_url": "https://api.github.com/repos/Automattic/socket.io/issues/1956/labels{/name}",
          "comments_url": "https://api.github.com/repos/Automattic/socket.io/issues/1956/comments",
          "events_url": "https://api.github.com/repos/Automattic/socket.io/issues/1956/events",
          "html_url": "https://github.com/Automattic/socket.io/issues/1956",
          "id": 55009933,
          "number": 1956,
          "title": "Don't reuse same-namespace connections",
          "user": {
            "login": "rauchg",
            "id": 13041,
            "avatar_url": "https://avatars.githubusercontent.com/u/13041?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/rauchg",
            "html_url": "https://github.com/rauchg",
            "followers_url": "https://api.github.com/users/rauchg/followers",
            "following_url": "https://api.github.com/users/rauchg/following{/other_user}",
            "gists_url": "https://api.github.com/users/rauchg/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/rauchg/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/rauchg/subscriptions",
            "organizations_url": "https://api.github.com/users/rauchg/orgs",
            "repos_url": "https://api.github.com/users/rauchg/repos",
            "events_url": "https://api.github.com/users/rauchg/events{/privacy}",
            "received_events_url": "https://api.github.com/users/rauchg/received_events",
            "type": "User",
            "site_admin": false
          },
          "labels": [

          ],
          "state": "open",
          "locked": false,
          "assignee": null,
          "milestone": {
            "url": "https://api.github.com/repos/Automattic/socket.io/milestones/2",
            "labels_url": "https://api.github.com/repos/Automattic/socket.io/milestones/2/labels",
            "id": 941719,
            "number": 2,
            "title": "1.4.0",
            "description": "",
            "creator": {
              "login": "rauchg",
              "id": 13041,
              "avatar_url": "https://avatars.githubusercontent.com/u/13041?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/rauchg",
              "html_url": "https://github.com/rauchg",
              "followers_url": "https://api.github.com/users/rauchg/followers",
              "following_url": "https://api.github.com/users/rauchg/following{/other_user}",
              "gists_url": "https://api.github.com/users/rauchg/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/rauchg/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/rauchg/subscriptions",
              "organizations_url": "https://api.github.com/users/rauchg/orgs",
              "repos_url": "https://api.github.com/users/rauchg/repos",
              "events_url": "https://api.github.com/users/rauchg/events{/privacy}",
              "received_events_url": "https://api.github.com/users/rauchg/received_events",
              "type": "User",
              "site_admin": false
            },
            "open_issues": 8,
            "closed_issues": 0,
            "state": "open",
            "created_at": "2015-01-19T11:52:32Z",
            "updated_at": "2015-01-21T12:01:39Z",
            "due_on": "2015-02-23T00:00:00Z",
            "closed_at": null
          },
          "comments": 13,
          "created_at": "2015-01-21T12:01:39Z",
          "updated_at": "2015-02-17T16:42:58Z",
          "closed_at": null,
          "body": "```js\r\nio('http://localhost/')\r\nio('http://localhost/')\r\n```\r\n\r\nwill create two connections moving forward."
        },
        "comment": {
          "url": "https://api.github.com/repos/Automattic/socket.io/issues/comments/74700627",
          "html_url": "https://github.com/Automattic/socket.io/issues/1956#issuecomment-74700627",
          "issue_url": "https://api.github.com/repos/Automattic/socket.io/issues/1956",
          "id": 74700627,
          "user": {
            "login": "peteruithoven",
            "id": 523210,
            "avatar_url": "https://avatars.githubusercontent.com/u/523210?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/peteruithoven",
            "html_url": "https://github.com/peteruithoven",
            "followers_url": "https://api.github.com/users/peteruithoven/followers",
            "following_url": "https://api.github.com/users/peteruithoven/following{/other_user}",
            "gists_url": "https://api.github.com/users/peteruithoven/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/peteruithoven/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/peteruithoven/subscriptions",
            "organizations_url": "https://api.github.com/users/peteruithoven/orgs",
            "repos_url": "https://api.github.com/users/peteruithoven/repos",
            "events_url": "https://api.github.com/users/peteruithoven/events{/privacy}",
            "received_events_url": "https://api.github.com/users/peteruithoven/received_events",
            "type": "User",
            "site_admin": false
          },
          "created_at": "2015-02-17T16:42:58Z",
          "updated_at": "2015-02-17T16:42:58Z",
          "body": "As mentioned in the above referenced issue, the great benefit of this approach is that you can change  query parameters. "
        }
      },
      "public": true,
      "created_at": "2015-02-17T16:42:59Z",
      "org": {
        "id": 887802,
        "login": "Automattic",
        "gravatar_id": "",
        "url": "https://api.github.com/orgs/Automattic",
        "avatar_url": "https://avatars.githubusercontent.com/u/887802?"
      }
    },
    {
      "id": "2587098184",
      "type": "WatchEvent",
      "actor": {
        "id": 505427,
        "login": "robertomiranda",
        "gravatar_id": "",
        "url": "https://api.github.com/users/robertomiranda",
        "avatar_url": "https://avatars.githubusercontent.com/u/505427?"
      },
      "repo": {
        "id": 557980,
        "name": "Automattic/socket.io",
        "url": "https://api.github.com/repos/Automattic/socket.io"
      },
      "payload": {
        "action": "started"
      },
      "public": true,
      "created_at": "2015-02-17T16:25:00Z",
      "org": {
        "id": 887802,
        "login": "Automattic",
        "gravatar_id": "",
        "url": "https://api.github.com/orgs/Automattic",
        "avatar_url": "https://avatars.githubusercontent.com/u/887802?"
      }
    },
    {
      "id": "2587071090",
      "type": "IssueCommentEvent",
      "actor": {
        "id": 523210,
        "login": "peteruithoven",
        "gravatar_id": "",
        "url": "https://api.github.com/users/peteruithoven",
        "avatar_url": "https://avatars.githubusercontent.com/u/523210?"
      },
      "repo": {
        "id": 557980,
        "name": "Automattic/socket.io",
        "url": "https://api.github.com/repos/Automattic/socket.io"
      },
      "payload": {
        "action": "created",
        "issue": {
          "url": "https://api.github.com/repos/Automattic/socket.io/issues/1677",
          "labels_url": "https://api.github.com/repos/Automattic/socket.io/issues/1677/labels{/name}",
          "comments_url": "https://api.github.com/repos/Automattic/socket.io/issues/1677/comments",
          "events_url": "https://api.github.com/repos/Automattic/socket.io/issues/1677/events",
          "html_url": "https://github.com/Automattic/socket.io/issues/1677",
          "id": 37585937,
          "number": 1677,
          "title": "Changing query parameter issue",
          "user": {
            "login": "Aourin",
            "id": 6233164,
            "avatar_url": "https://avatars.githubusercontent.com/u/6233164?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/Aourin",
            "html_url": "https://github.com/Aourin",
            "followers_url": "https://api.github.com/users/Aourin/followers",
            "following_url": "https://api.github.com/users/Aourin/following{/other_user}",
            "gists_url": "https://api.github.com/users/Aourin/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/Aourin/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/Aourin/subscriptions",
            "organizations_url": "https://api.github.com/users/Aourin/orgs",
            "repos_url": "https://api.github.com/users/Aourin/repos",
            "events_url": "https://api.github.com/users/Aourin/events{/privacy}",
            "received_events_url": "https://api.github.com/users/Aourin/received_events",
            "type": "User",
            "site_admin": false
          },
          "labels": [

          ],
          "state": "open",
          "locked": false,
          "assignee": null,
          "milestone": null,
          "comments": 4,
          "created_at": "2014-07-10T17:36:22Z",
          "updated_at": "2015-02-17T16:15:55Z",
          "closed_at": null,
          "body": "I am hoping I can get some direction on this.\r\n\r\nInitializing the io with io(url,opts) works with the query parameter. If that query parameter needs to change you can dot into the sio.io.opts object. However, after it is changed that way, it is not able to be changed again.\r\n\r\n##### Iteration 0 - Works On Initialization \r\n<code>\r\nsocket = io(options.socket,{query: {_accessToken: 'cow'} });   \r\n</code>\r\nServer's socket.request._query._accessToken returns 'cow'\r\n##### Iteration 1 -Works When changed the first time\r\n<code>\r\nsocket.io.opts.query._accessToken = 'moo';\r\n</code>\r\nServer's socket.request._query._accessToken returns 'moo'\r\n##### Iteration 2 -  Doesn't work anymore\r\n<code>\r\nsocket.io.opts.query._accessToken = 'twomoos';\r\n</code>\r\nServer's socket.request._query._accessToken returns 'moo''\r\n\r\nAlthough it seems to change on the client side, the server still returns the value of the access token in Iteration 1. \r\n\r\nDoing some digging, I found that the \r\n<code>\r\nsocket.io.engine.transport.ws\r\n</code>\r\ncontains the URL for the request, but keeps the _accessToken as the iteration 1 variable. \r\n<code>\r\nws://192.168.1.8/socket.io/?_accessToken=moo&transport=websocket&sid=mY9rC4km7ASypgDTAAAI \r\n</code>\r\nI can't change the variable using javascript because it still stays the same. That also seems rather hacky and I'd like to not do that.\r\n\r\nI haven't put in an issue request for anything, so I hope this counts as a legitimate one."
        },
        "comment": {
          "url": "https://api.github.com/repos/Automattic/socket.io/issues/comments/74694979",
          "html_url": "https://github.com/Automattic/socket.io/issues/1677#issuecomment-74694979",
          "issue_url": "https://api.github.com/repos/Automattic/socket.io/issues/1677",
          "id": 74694979,
          "user": {
            "login": "peteruithoven",
            "id": 523210,
            "avatar_url": "https://avatars.githubusercontent.com/u/523210?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/peteruithoven",
            "html_url": "https://github.com/peteruithoven",
            "followers_url": "https://api.github.com/users/peteruithoven/followers",
            "following_url": "https://api.github.com/users/peteruithoven/following{/other_user}",
            "gists_url": "https://api.github.com/users/peteruithoven/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/peteruithoven/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/peteruithoven/subscriptions",
            "organizations_url": "https://api.github.com/users/peteruithoven/orgs",
            "repos_url": "https://api.github.com/users/peteruithoven/repos",
            "events_url": "https://api.github.com/users/peteruithoven/events{/privacy}",
            "received_events_url": "https://api.github.com/users/peteruithoven/received_events",
            "type": "User",
            "site_admin": false
          },
          "created_at": "2015-02-17T16:15:55Z",
          "updated_at": "2015-02-17T16:15:55Z",
          "body": "The fix that would solve my situation is not released yet. "
        }
      },
      "public": true,
      "created_at": "2015-02-17T16:15:56Z",
      "org": {
        "id": 887802,
        "login": "Automattic",
        "gravatar_id": "",
        "url": "https://api.github.com/orgs/Automattic",
        "avatar_url": "https://avatars.githubusercontent.com/u/887802?"
      }
    },
    {
      "id": "2586963464",
      "type": "WatchEvent",
      "actor": {
        "id": 3639811,
        "login": "deepakkarki",
        "gravatar_id": "",
        "url": "https://api.github.com/users/deepakkarki",
        "avatar_url": "https://avatars.githubusercontent.com/u/3639811?"
      },
      "repo": {
        "id": 557980,
        "name": "Automattic/socket.io",
        "url": "https://api.github.com/repos/Automattic/socket.io"
      },
      "payload": {
        "action": "started"
      },
      "public": true,
      "created_at": "2015-02-17T15:39:43Z",
      "org": {
        "id": 887802,
        "login": "Automattic",
        "gravatar_id": "",
        "url": "https://api.github.com/orgs/Automattic",
        "avatar_url": "https://avatars.githubusercontent.com/u/887802?"
      }
    },
    {
      "id": "2586734627",
      "type": "IssueCommentEvent",
      "actor": {
        "id": 523210,
        "login": "peteruithoven",
        "gravatar_id": "",
        "url": "https://api.github.com/users/peteruithoven",
        "avatar_url": "https://avatars.githubusercontent.com/u/523210?"
      },
      "repo": {
        "id": 557980,
        "name": "Automattic/socket.io",
        "url": "https://api.github.com/repos/Automattic/socket.io"
      },
      "payload": {
        "action": "created",
        "issue": {
          "url": "https://api.github.com/repos/Automattic/socket.io/issues/1677",
          "labels_url": "https://api.github.com/repos/Automattic/socket.io/issues/1677/labels{/name}",
          "comments_url": "https://api.github.com/repos/Automattic/socket.io/issues/1677/comments",
          "events_url": "https://api.github.com/repos/Automattic/socket.io/issues/1677/events",
          "html_url": "https://github.com/Automattic/socket.io/issues/1677",
          "id": 37585937,
          "number": 1677,
          "title": "Changing query parameter issue",
          "user": {
            "login": "Aourin",
            "id": 6233164,
            "avatar_url": "https://avatars.githubusercontent.com/u/6233164?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/Aourin",
            "html_url": "https://github.com/Aourin",
            "followers_url": "https://api.github.com/users/Aourin/followers",
            "following_url": "https://api.github.com/users/Aourin/following{/other_user}",
            "gists_url": "https://api.github.com/users/Aourin/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/Aourin/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/Aourin/subscriptions",
            "organizations_url": "https://api.github.com/users/Aourin/orgs",
            "repos_url": "https://api.github.com/users/Aourin/repos",
            "events_url": "https://api.github.com/users/Aourin/events{/privacy}",
            "received_events_url": "https://api.github.com/users/Aourin/received_events",
            "type": "User",
            "site_admin": false
          },
          "labels": [

          ],
          "state": "open",
          "locked": false,
          "assignee": null,
          "milestone": null,
          "comments": 3,
          "created_at": "2014-07-10T17:36:22Z",
          "updated_at": "2015-02-17T14:11:58Z",
          "closed_at": null,
          "body": "I am hoping I can get some direction on this.\r\n\r\nInitializing the io with io(url,opts) works with the query parameter. If that query parameter needs to change you can dot into the sio.io.opts object. However, after it is changed that way, it is not able to be changed again.\r\n\r\n##### Iteration 0 - Works On Initialization \r\n<code>\r\nsocket = io(options.socket,{query: {_accessToken: 'cow'} });   \r\n</code>\r\nServer's socket.request._query._accessToken returns 'cow'\r\n##### Iteration 1 -Works When changed the first time\r\n<code>\r\nsocket.io.opts.query._accessToken = 'moo';\r\n</code>\r\nServer's socket.request._query._accessToken returns 'moo'\r\n##### Iteration 2 -  Doesn't work anymore\r\n<code>\r\nsocket.io.opts.query._accessToken = 'twomoos';\r\n</code>\r\nServer's socket.request._query._accessToken returns 'moo''\r\n\r\nAlthough it seems to change on the client side, the server still returns the value of the access token in Iteration 1. \r\n\r\nDoing some digging, I found that the \r\n<code>\r\nsocket.io.engine.transport.ws\r\n</code>\r\ncontains the URL for the request, but keeps the _accessToken as the iteration 1 variable. \r\n<code>\r\nws://192.168.1.8/socket.io/?_accessToken=moo&transport=websocket&sid=mY9rC4km7ASypgDTAAAI \r\n</code>\r\nI can't change the variable using javascript because it still stays the same. That also seems rather hacky and I'd like to not do that.\r\n\r\nI haven't put in an issue request for anything, so I hope this counts as a legitimate one."
        },
        "comment": {
          "url": "https://api.github.com/repos/Automattic/socket.io/issues/comments/74672860",
          "html_url": "https://github.com/Automattic/socket.io/issues/1677#issuecomment-74672860",
          "issue_url": "https://api.github.com/repos/Automattic/socket.io/issues/1677",
          "id": 74672860,
          "user": {
            "login": "peteruithoven",
            "id": 523210,
            "avatar_url": "https://avatars.githubusercontent.com/u/523210?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/peteruithoven",
            "html_url": "https://github.com/peteruithoven",
            "followers_url": "https://api.github.com/users/peteruithoven/followers",
            "following_url": "https://api.github.com/users/peteruithoven/following{/other_user}",
            "gists_url": "https://api.github.com/users/peteruithoven/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/peteruithoven/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/peteruithoven/subscriptions",
            "organizations_url": "https://api.github.com/users/peteruithoven/orgs",
            "repos_url": "https://api.github.com/users/peteruithoven/repos",
            "events_url": "https://api.github.com/users/peteruithoven/events{/privacy}",
            "received_events_url": "https://api.github.com/users/peteruithoven/received_events",
            "type": "User",
            "site_admin": false
          },
          "created_at": "2015-02-17T14:11:58Z",
          "updated_at": "2015-02-17T14:11:58Z",
          "body": "A bigger issue for me is that I can't work around this with forceNew, without always using it (disabling multiplexing in general). It will pick up query string changes when forceNew is enabled, but when I don't supply this anymore it will fallback to the old & cached manager and it will use the old query string again. \r\nThis is partly caused by the fact that a connection made with forceNew or disabling multiplex are not cached. \r\n\r\nActually I now see that it should make a new connection when it's the same namespace since a few days, see the commit below. That would solve my issue. Maybe this is not released yet. I'll check.  \r\nhttps://github.com/Automattic/socket.io-client/commit/7d237cc91fbb34ce484b188cf7d10462c6b34bd9"
        }
      },
      "public": true,
      "created_at": "2015-02-17T14:11:59Z",
      "org": {
        "id": 887802,
        "login": "Automattic",
        "gravatar_id": "",
        "url": "https://api.github.com/orgs/Automattic",
        "avatar_url": "https://avatars.githubusercontent.com/u/887802?"
      }
    },
    {
      "id": "2586726449",
      "type": "IssueCommentEvent",
      "actor": {
        "id": 1138023,
        "login": "jakubknejzlik",
        "gravatar_id": "",
        "url": "https://api.github.com/users/jakubknejzlik",
        "avatar_url": "https://avatars.githubusercontent.com/u/1138023?"
      },
      "repo": {
        "id": 557980,
        "name": "Automattic/socket.io",
        "url": "https://api.github.com/repos/Automattic/socket.io"
      },
      "payload": {
        "action": "created",
        "issue": {
          "url": "https://api.github.com/repos/Automattic/socket.io/issues/828",
          "labels_url": "https://api.github.com/repos/Automattic/socket.io/issues/828/labels{/name}",
          "comments_url": "https://api.github.com/repos/Automattic/socket.io/issues/828/comments",
          "events_url": "https://api.github.com/repos/Automattic/socket.io/issues/828/events",
          "html_url": "https://github.com/Automattic/socket.io/issues/828",
          "id": 4074543,
          "number": 828,
          "title": "Best way to handle timeouts on acknowledgements",
          "user": {
            "login": "jjoschyy",
            "id": 601773,
            "avatar_url": "https://avatars.githubusercontent.com/u/601773?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/jjoschyy",
            "html_url": "https://github.com/jjoschyy",
            "followers_url": "https://api.github.com/users/jjoschyy/followers",
            "following_url": "https://api.github.com/users/jjoschyy/following{/other_user}",
            "gists_url": "https://api.github.com/users/jjoschyy/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/jjoschyy/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/jjoschyy/subscriptions",
            "organizations_url": "https://api.github.com/users/jjoschyy/orgs",
            "repos_url": "https://api.github.com/users/jjoschyy/repos",
            "events_url": "https://api.github.com/users/jjoschyy/events{/privacy}",
            "received_events_url": "https://api.github.com/users/jjoschyy/received_events",
            "type": "User",
            "site_admin": false
          },
          "labels": [

          ],
          "state": "closed",
          "locked": false,
          "assignee": null,
          "milestone": null,
          "comments": 1,
          "created_at": "2012-04-11T22:08:19Z",
          "updated_at": "2015-02-17T14:08:14Z",
          "closed_at": "2014-08-19T00:26:05Z",
          "body": "Dear LearnBoost\r\n\r\nUsing the acknowledgements \"feature\" from socket.io works fine. Just in case the server does not respond (e.g. due to connection loss or high server load), the acknowledgement callback will never be fired. Therefore, I tried to implement timeouts for acknowledgements. \r\n\r\nThe following example is working, but it can happen that both, timeoutErrorFn and acknCallbackFn, will be executed. Is there an better, more common way to solve this problem? Do you think about adding timeouts to the \"emit\" as basic feature?\r\n\r\nThank you very much for any idea!\r\nJoschy\r\n\r\n\r\n```javascript\r\n\r\n\r\nvar timeoutId = setTimeout(timeoutErrorFn, 500);\r\n\r\nvar acknCallbackFn = function(err, userData){\r\n  clearTimeout(timeoutId)\r\n  //manage UserData\r\n}\r\n\r\nsocket.emit('getUserData', acknCallbackFn);\r\n\r\n```"
        },
        "comment": {
          "url": "https://api.github.com/repos/Automattic/socket.io/issues/comments/74672354",
          "html_url": "https://github.com/Automattic/socket.io/issues/828#issuecomment-74672354",
          "issue_url": "https://api.github.com/repos/Automattic/socket.io/issues/828",
          "id": 74672354,
          "user": {
            "login": "jakubknejzlik",
            "id": 1138023,
            "avatar_url": "https://avatars.githubusercontent.com/u/1138023?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/jakubknejzlik",
            "html_url": "https://github.com/jakubknejzlik",
            "followers_url": "https://api.github.com/users/jakubknejzlik/followers",
            "following_url": "https://api.github.com/users/jakubknejzlik/following{/other_user}",
            "gists_url": "https://api.github.com/users/jakubknejzlik/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/jakubknejzlik/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/jakubknejzlik/subscriptions",
            "organizations_url": "https://api.github.com/users/jakubknejzlik/orgs",
            "repos_url": "https://api.github.com/users/jakubknejzlik/repos",
            "events_url": "https://api.github.com/users/jakubknejzlik/events{/privacy}",
            "received_events_url": "https://api.github.com/users/jakubknejzlik/received_events",
            "type": "User",
            "site_admin": false
          },
          "created_at": "2015-02-17T14:08:14Z",
          "updated_at": "2015-02-17T14:08:14Z",
          "body": "If anyone lands here, please check the following module:\r\nhttps://www.npmjs.com/package/timeout-callback\r\n\r\nHope it helps :)"
        }
      },
      "public": true,
      "created_at": "2015-02-17T14:08:15Z",
      "org": {
        "id": 887802,
        "login": "Automattic",
        "gravatar_id": "",
        "url": "https://api.github.com/orgs/Automattic",
        "avatar_url": "https://avatars.githubusercontent.com/u/887802?"
      }
    },
    {
      "id": "2586705896",
      "type": "IssueCommentEvent",
      "actor": {
        "id": 523210,
        "login": "peteruithoven",
        "gravatar_id": "",
        "url": "https://api.github.com/users/peteruithoven",
        "avatar_url": "https://avatars.githubusercontent.com/u/523210?"
      },
      "repo": {
        "id": 557980,
        "name": "Automattic/socket.io",
        "url": "https://api.github.com/repos/Automattic/socket.io"
      },
      "payload": {
        "action": "created",
        "issue": {
          "url": "https://api.github.com/repos/Automattic/socket.io/issues/1677",
          "labels_url": "https://api.github.com/repos/Automattic/socket.io/issues/1677/labels{/name}",
          "comments_url": "https://api.github.com/repos/Automattic/socket.io/issues/1677/comments",
          "events_url": "https://api.github.com/repos/Automattic/socket.io/issues/1677/events",
          "html_url": "https://github.com/Automattic/socket.io/issues/1677",
          "id": 37585937,
          "number": 1677,
          "title": "Changing query parameter issue",
          "user": {
            "login": "Aourin",
            "id": 6233164,
            "avatar_url": "https://avatars.githubusercontent.com/u/6233164?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/Aourin",
            "html_url": "https://github.com/Aourin",
            "followers_url": "https://api.github.com/users/Aourin/followers",
            "following_url": "https://api.github.com/users/Aourin/following{/other_user}",
            "gists_url": "https://api.github.com/users/Aourin/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/Aourin/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/Aourin/subscriptions",
            "organizations_url": "https://api.github.com/users/Aourin/orgs",
            "repos_url": "https://api.github.com/users/Aourin/repos",
            "events_url": "https://api.github.com/users/Aourin/events{/privacy}",
            "received_events_url": "https://api.github.com/users/Aourin/received_events",
            "type": "User",
            "site_admin": false
          },
          "labels": [

          ],
          "state": "open",
          "locked": false,
          "assignee": null,
          "milestone": null,
          "comments": 2,
          "created_at": "2014-07-10T17:36:22Z",
          "updated_at": "2015-02-17T13:58:55Z",
          "closed_at": null,
          "body": "I am hoping I can get some direction on this.\r\n\r\nInitializing the io with io(url,opts) works with the query parameter. If that query parameter needs to change you can dot into the sio.io.opts object. However, after it is changed that way, it is not able to be changed again.\r\n\r\n##### Iteration 0 - Works On Initialization \r\n<code>\r\nsocket = io(options.socket,{query: {_accessToken: 'cow'} });   \r\n</code>\r\nServer's socket.request._query._accessToken returns 'cow'\r\n##### Iteration 1 -Works When changed the first time\r\n<code>\r\nsocket.io.opts.query._accessToken = 'moo';\r\n</code>\r\nServer's socket.request._query._accessToken returns 'moo'\r\n##### Iteration 2 -  Doesn't work anymore\r\n<code>\r\nsocket.io.opts.query._accessToken = 'twomoos';\r\n</code>\r\nServer's socket.request._query._accessToken returns 'moo''\r\n\r\nAlthough it seems to change on the client side, the server still returns the value of the access token in Iteration 1. \r\n\r\nDoing some digging, I found that the \r\n<code>\r\nsocket.io.engine.transport.ws\r\n</code>\r\ncontains the URL for the request, but keeps the _accessToken as the iteration 1 variable. \r\n<code>\r\nws://192.168.1.8/socket.io/?_accessToken=moo&transport=websocket&sid=mY9rC4km7ASypgDTAAAI \r\n</code>\r\nI can't change the variable using javascript because it still stays the same. That also seems rather hacky and I'd like to not do that.\r\n\r\nI haven't put in an issue request for anything, so I hope this counts as a legitimate one."
        },
        "comment": {
          "url": "https://api.github.com/repos/Automattic/socket.io/issues/comments/74671129",
          "html_url": "https://github.com/Automattic/socket.io/issues/1677#issuecomment-74671129",
          "issue_url": "https://api.github.com/repos/Automattic/socket.io/issues/1677",
          "id": 74671129,
          "user": {
            "login": "peteruithoven",
            "id": 523210,
            "avatar_url": "https://avatars.githubusercontent.com/u/523210?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/peteruithoven",
            "html_url": "https://github.com/peteruithoven",
            "followers_url": "https://api.github.com/users/peteruithoven/followers",
            "following_url": "https://api.github.com/users/peteruithoven/following{/other_user}",
            "gists_url": "https://api.github.com/users/peteruithoven/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/peteruithoven/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/peteruithoven/subscriptions",
            "organizations_url": "https://api.github.com/users/peteruithoven/orgs",
            "repos_url": "https://api.github.com/users/peteruithoven/repos",
            "events_url": "https://api.github.com/users/peteruithoven/events{/privacy}",
            "received_events_url": "https://api.github.com/users/peteruithoven/received_events",
            "type": "User",
            "site_admin": false
          },
          "created_at": "2015-02-17T13:58:54Z",
          "updated_at": "2015-02-17T13:58:54Z",
          "body": "I've been providing the query string through the url (instead of through a query property of the options object). And I've been experiencing that it doesn't pick up query changes at all. \r\nLooking through the code it doesn't pass changes properties to a cached manager. (Unless the namespace changed or options like forceNew, or multiplex are used). \r\nhttps://github.com/Automattic/socket.io-client/blob/master/lib/index.js#L36\r\n\r\nI can confirm this by enabling the debug for engine.io* and socket.io*. I see that eventhough I changed the querry string in the url it opens the old url. (Through the `socket.io-client:manager opening ...` statement)\r\n\r\nAlso, I don't see a query property used in the code... Are you sure this is supported? \r\nYou are using version 1.x and not 0.9 right? \r\nMaybe you can also debug this by enabling the debug statements of socket.io and engine.io. "
        }
      },
      "public": true,
      "created_at": "2015-02-17T13:58:55Z",
      "org": {
        "id": 887802,
        "login": "Automattic",
        "gravatar_id": "",
        "url": "https://api.github.com/orgs/Automattic",
        "avatar_url": "https://avatars.githubusercontent.com/u/887802?"
      }
    }
  ];

  var $rootScope, $compile, $httpBackend;

  beforeEach(module('involved'));
  beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  describe('repo service', function() {
    var repo;
    beforeEach(function(done) {
      inject(function(_repo_) {
        repo = _repo_;
        repo.db.allDocs(function(err, docs) {
          docs.rows.forEach(function(r) {
            repo.db.remove(r.id)
          });
          done();
        });
      });
    });

    describe('watch', function() {
      it('should add repository', function(done) {
        // given
        var r = {owner: 'Automattic', repo: 'socket.io'};
        // when
        repo.watch(r, function(err, repos) {
          // then
          expect(repos.length).to.be.equal(1);
          done();
        });
      });
    });

    describe('unwatch', function() {
      it('should remove specific repository', function(done) {
        // given
        var r = {owner: 'Automattic', repo: 'socket.io'};
        var r2 = {owner: 'iojs', repo: 'io.js'};
        repo.watch(r, function() {
          repo.watch(r2, function() {
            // when
            repo.unwatch(r2, function(err, repos) {
              // then
              expect(repos.length).to.be.equal(1);
              expect(repos[0].owner).to.be.equal(r.owner);
              done();
            });
          });
        })
      });
    });

    describe('fetchEventsOfRepo', function() {
      beforeEach(function() {
        $httpBackend.whenGET('https://api.github.com/user?access_token=' + githubToken)
          .respond({});
        $httpBackend.whenGET('https://api.github.com/repos/Automattic/socket.io/events?access_token='+githubToken+'&page=1&per_page=10')
          .respond(eventPayload);
      });

      it('should fetch from github', function(done) {
        $httpBackend.expectGET('https://api.github.com/repos/Automattic/socket.io/events?access_token='+githubToken+'&page=1&per_page=10');
        // given
        var r = {owner: 'Automattic', repo: 'socket.io'};
        // when
        repo.fetchEventsOfRepo(r)
          .then(function(results) {
            // then
            done();
          }).catch(done);

        $httpBackend.flush();
        setTimeout(function() { $rootScope.$apply(); }, 1000);
      });
    });
  });
});
